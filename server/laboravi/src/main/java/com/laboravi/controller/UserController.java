package com.laboravi.controller;


import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.laboravi.bean.User;
import com.laboravi.repository.DepartmentRepository;
import com.laboravi.repository.RoleRepository;
import com.laboravi.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	DepartmentRepository departmentRepository;
	
	@PostMapping(path = "/create")
	public @ResponseBody String create(@RequestBody Map<String, Object> data) {

		User user = new User();
		user.setName(data.get("name").toString());
		user.setPassword(data.get("password").toString());
		user.setDepartment(departmentRepository.findById(Integer.parseInt(data.get("department_id").toString())).get());
		user.setRole(roleRepository.findById(Integer.parseInt(data.get("role_id").toString())).get());

		try {
			userRepository.save(user);
		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";
	}

	@PutMapping(path = "/update")
	public String update(@RequestBody Map<String, Object> data) {

		
		User user = userRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		user.setName(data.get("name").toString());
		user.setPassword(data.get("password").toString());
		user.setDepartment(departmentRepository.findById(Integer.parseInt(data.get("department_id").toString())).get());
		user.setRole(roleRepository.findById(Integer.parseInt(data.get("role_id").toString())).get());

		try {
			userRepository.save(user);
		} catch (Exception e) {

			return e.getMessage();

		}

		return "success";
	}
	
	@PostMapping(path = "/login")
	public @ResponseBody User login(@RequestBody Map<String, Object> data) {
		
		String login = data.get("name").toString();
		String password = data.get("password").toString();
	

		User user = userRepository.authenticate(login, password);

		return user;

	}

	@DeleteMapping(path = "/delete")
	public String delete(@RequestParam("id") int id) {

		userRepository.deleteById(id);
		return "success";
	}

	@GetMapping(path = "/all")
	public Iterable<User> listAll() {
		return userRepository.findAll();

	}

	@GetMapping
	public Optional<User> get(@RequestParam("id") int id) {
		return userRepository.findById(id);
	}

}
