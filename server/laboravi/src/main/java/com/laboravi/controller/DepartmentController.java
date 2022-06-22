package com.laboravi.controller;

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

import com.laboravi.bean.Department;
import com.laboravi.repository.DepartmentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/department")
public class DepartmentController {

	@Autowired
	DepartmentRepository departmentRepository;

	@PostMapping(path = "/create")
	public @ResponseBody String create(@RequestParam Map<String, Object> data) {

		Department department = new Department();

		department.setDescription(data.get("description").toString());
		department.setName(data.get("name").toString());
		department.setTime_work(Integer.parseInt(data.get("time_work").toString()));

		try {

		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";

	}

	@PostMapping(path = "/update")
	public @ResponseBody String update(@RequestParam Map<String, Object> data) {

		Department department = departmentRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		department.setDescription(data.get("description").toString());
		department.setName(data.get("name").toString());
		department.setTime_work(Integer.parseInt(data.get("time_work").toString()));

		try {

		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";

	}

	@DeleteMapping(path = "/delete")
	public String delete(@RequestParam("id") int id) {

		departmentRepository.deleteById(id);
		return "success";
	}

	@GetMapping(path = "/all")
	public Iterable<Department> listAll() {
		return departmentRepository.findAll();

	}

	@GetMapping
	public Optional<Department> get(@RequestParam("id") int id) {
		return departmentRepository.findById(id);
	}
}
