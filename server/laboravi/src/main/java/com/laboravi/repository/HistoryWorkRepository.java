package com.laboravi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.laboravi.bean.HistoryWork;

public interface HistoryWorkRepository extends CrudRepository<HistoryWork, Integer> {
	

	@Query(value = "SELECT * FROM laboravi.history_work AS h"
			+ " WHERE h.user_id = :user_id  AND DATE(h.point_at) = DATE(NOW())", nativeQuery = true)
	List<HistoryWork> findHistoryToday(@Param("user_id") int id);

}
