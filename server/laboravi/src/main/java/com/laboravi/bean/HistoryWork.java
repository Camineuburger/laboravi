package com.laboravi.bean;

import java.util.Date;

import javax.persistence.Column;
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
	private Date peding_point_at;
	@ManyToOne
	private User user;
	private String description;
	@Column(columnDefinition = "boolean default false")
	private boolean is_pending;

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

	public boolean isIs_pending() {
		return is_pending;
	}

	public void setIs_pending(boolean is_pending) {
		this.is_pending = is_pending;
	}

	public Date getPeding_point_at() {
		return peding_point_at;
	}

	public void setPeding_point_at(Date peding_point_at) {
		this.peding_point_at = peding_point_at;
	}

}
