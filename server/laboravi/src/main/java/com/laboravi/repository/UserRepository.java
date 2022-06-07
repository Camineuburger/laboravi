package com.laboravi.repository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.laboravi.bean.User;


public interface UserRepository extends CrudRepository<User, Integer> {

	@Query(value = "SELECT * FROM uniride.user AS u"
			+ " WHERE (u.cpf = :cpf_mail OR u.mail = :cpf_mail) AND u.password = :password", nativeQuery = true)
	User authenticate(@Param("cpf_mail") String cpf_mail, @Param("password") String password);

}