package com.laboravi.controller;

import java.util.Date;
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

import com.laboravi.bean.HistoryWork;
import com.laboravi.bean.User;
import com.laboravi.repository.HistoryWorkRepository;
import com.laboravi.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/historywork")
public class HistoryWorkController {

	@Autowired
	HistoryWorkRepository historyWorkRepository;

	@Autowired
	UserRepository userRepository;

	@PostMapping(path = "/create")
	public @ResponseBody String create(@RequestParam Map<String, Object> data) {

		User user = userRepository.findById(Integer.parseInt(data.get("user_id").toString())).get();
		HistoryWork historyWork = new HistoryWork();

		historyWork.setDescription(data.get("description").toString());
		historyWork.setUser(user);
		historyWork.setPoint_at(new Date());

		return "Success";
	}
	
	@SuppressWarnings("deprecation")
	@PostMapping(path = "/update/worklog")
	public @ResponseBody String updateWorkLog(@RequestParam Map<String, Object> data) {

		HistoryWork historyWork = historyWorkRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		historyWork.setDescription(data.get("description").toString());
		historyWork.setIs_pending(true);
		historyWork.setPeding_point_at(new Date(data.get("point_at").toString()));

		return "Success";
	}
	
	@SuppressWarnings("deprecation")
	@PostMapping(path = "/update/pending")
	public @ResponseBody String updatePending(@RequestParam Map<String, Object> data) {

		HistoryWork historyWork = historyWorkRepository.findById(Integer.parseInt(data.get("id").toString())).get();

		historyWork.setDescription(data.get("description").toString());
		historyWork.setPoint_at(new Date(data.get("date").toString()));

		return "Success";
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
