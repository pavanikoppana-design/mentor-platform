package com.pavani.mentor_platform.repository;

import com.pavani.mentor_platform.entity.SessionRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRoomRepository extends JpaRepository<SessionRoom, Long> {
    Optional<SessionRoom> findBySessionCode(String sessionCode);
}