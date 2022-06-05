package com.laboravi.bean;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class HistoryWork {
	
	@Id
	@GeneratedValue
	private int id;
	private Date first_point;
	private Date second_point;
	private Date third_point;
	private Date fourty_point;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getFirst_point() {
		return first_point;
	}
	public void setFirst_point(Date first_point) {
		this.first_point = first_point;
	}
	public Date getSecond_point() {
		return second_point;
	}
	public void setSecond_point(Date second_point) {
		this.second_point = second_point;
	}
	public Date getThird_point() {
		return third_point;
	}
	public void setThird_point(Date third_point) {
		this.third_point = third_point;
	}
	public Date getFourty_point() {
		return fourty_point;
	}
	public void setFourty_point(Date fourty_point) {
		this.fourty_point = fourty_point;
	}
	
	

}
