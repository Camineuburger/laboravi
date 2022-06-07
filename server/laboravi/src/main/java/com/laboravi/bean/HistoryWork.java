package com.laboravi.bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class HistoryWork {
	
	@Id
	@GeneratedValue
	private int id;
	private Date point_at;
	@ManyToOne
	private User user;
	private String description;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getPoint_at() {
		return point_at;
	}
	public void setPoint_at(Date point_at) {
		this.point_at = point_at;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
