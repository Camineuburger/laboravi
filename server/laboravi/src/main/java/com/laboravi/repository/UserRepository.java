package com.laboravi.repository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.laboravi.bean.User;


public interface UserRepository extends CrudRepository<User, Integer> {

	@Query(value = "SELECT * FROM laboravi.user AS u"
			+ " WHERE u.login = :login  AND u.password = :password", nativeQuery = true)
	User authenticate(@Param("login") String login, @Param("password") String password);
	
}