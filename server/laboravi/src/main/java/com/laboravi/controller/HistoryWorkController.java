package com.laboravi.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import com.laboravi.bean.HistoryWork;
import com.laboravi.bean.User;
import com.laboravi.repository.HistoryWorkRepository;
import com.laboravi.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/historywork")
public class HistoryWorkController {

	@Autowired
	HistoryWorkRepository historyWorkRepository;

	@Autowired
	UserRepository userRepository;

	@PostMapping(path = "/create")
	public @ResponseBody String create(@RequestBody Map<String, Object> data) {
		
		System.out.println(data);

		
		User user = userRepository.findById(Integer.parseInt(data.get("user_id").toString())).get();
		LocalDateTime localDateTime = LocalDateTime.now();
		
		HistoryWork historyWork = new HistoryWork();

		historyWork.setDescription(data.get("description").toString());
		historyWork.setUser(user);
		historyWork.setPoint_at(localDateTime);

		try {
			historyWorkRepository.save(historyWork);
		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";
	}

	@PutMapping(path = "/update/worklog")
	public @ResponseBody String updateWorkLog(@RequestBody Map<String, Object> data) {
		
		LocalDateTime localDateTime = LocalDateTime.parse(data.get("point_at").toString(), DateTimeFormatter.ISO_DATE_TIME);
		
		HistoryWork historyWork = historyWorkRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		historyWork.setDescription(data.get("description").toString());
		historyWork.setIs_pending(true);
		historyWork.setPoint_at(localDateTime);

		try {
			historyWorkRepository.save(historyWork);
		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";
	}

	@PutMapping(path = "/update/pending")
	public @ResponseBody String updatePending(@RequestBody Map<String, Object> data) {

		HistoryWork historyWork = historyWorkRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		historyWork.setDescription(data.get("description").toString());

		try {
			historyWorkRepository.save(historyWork);
		} catch (Exception e) {
			return e.getMessage();
		}

		return "success";
	}

	@DeleteMapping(path = "/delete")
	public String delete(@RequestParam("id") int id) {

		historyWorkRepository.deleteById(id);
		return "success";
	}

	@GetMapping(path = "/all")
	public Iterable<HistoryWork> listAll() {
		return historyWorkRepository.findAll();
	}

	@GetMapping
	public Optional<HistoryWork> get(@RequestParam("id") int id) {
		return historyWorkRepository.findById(id);
	}

}
