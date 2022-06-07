package com.laboravi.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Department {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	private String description;
	private int time_work;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getTime_work() {
		return time_work;
	}
	public void setTime_work(int time_work) {
		this.time_work = time_work;
	}
		
}
