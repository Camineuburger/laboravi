package com.laboravi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.laboravi.bean.Permission;
import com.laboravi.bean.Role;
import com.laboravi.repository.PermissionRepository;
import com.laboravi.repository.RoleRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/role")
public class RoleController {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PermissionRepository permissionRepository;

	@SuppressWarnings({ "unchecked" })
	@PostMapping(path = "/create")
	public @ResponseBody String create(@RequestParam Map<String, Object> data) {

		Role role = new Role();

		role.setDescription(data.get("description").toString());
		role.setName(data.get("name").toString());
		role.setPermission((List<Permission>) data.get("list_permission"));
		
		try {
			roleRepository.save(role);
		} catch (Exception e) {
			return e.getMessage();
		}


		return "success";
	}

	@SuppressWarnings({ "unchecked" })
	@PostMapping(path = "/update")
	public @ResponseBody String update(@RequestParam Map<String, Object> data) {

		Role role = roleRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		role.setDescription(data.get("description").toString());
		role.setName(data.get("name").toString());
		role.setPermission((List<Permission>) data.get("list_permission"));

		try {
			roleRepository.save(role);
		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";
	}

	@DeleteMapping(path = "/delete")
	public String delete(@RequestParam("id") int id) {

		roleRepository.deleteById(id);
		return "success";
	}

	@GetMapping(path = "/all")
	public Iterable<Role> listAll() {
		return roleRepository.findAll();

	}

	@GetMapping
	public Optional<Role> get(@RequestParam("id") int id) {
		return roleRepository.findById(id);
	}

	@GetMapping(path = "/permissions")
	public Iterable<Permission> listAllPermission() {
		return permissionRepository.findAll();
	}

}
