package com.pavani.mentor_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "session_rooms")
public class SessionRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomName;
    private String sessionCode;
    private String mentorName;

    public SessionRoom() {
    }

    public SessionRoom(Long id, String roomName, String sessionCode, String mentorName) {
        this.id = id;
        this.roomName = roomName;
        this.sessionCode = sessionCode;
        this.mentorName = mentorName;
    }

    public Long getId() {
        return id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getSessionCode() {
        return sessionCode;
    }

    public void setSessionCode(String sessionCode) {
        this.sessionCode = sessionCode;
    }

    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public void setId(Long id) {
        this.id = id;
    }
}