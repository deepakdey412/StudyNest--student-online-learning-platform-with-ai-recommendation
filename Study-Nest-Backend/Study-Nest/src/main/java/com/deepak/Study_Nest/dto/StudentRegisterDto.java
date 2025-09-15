package com.deepak.Study_Nest.dto;

public record StudentRegisterDto(
        String name,
        String rollNo,
        String prn,
        Integer semester,
        String email,
        String password
) {}
