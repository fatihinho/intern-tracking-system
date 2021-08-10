package com.fcinar.interntrackingsystem.configuration;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(@NotNull AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("intern").password("{noop}123").roles("INTERN")
                .and()
                .withUser("company").password("{noop}456").roles("COMPANY")
                .and()
                .withUser("institution").password("{noop}789").roles("INSTITUTION")
                .and()
                .withUser("admin").password("{noop}000").roles("ADMIN", "INTERN", "COMPANY", "INSTITUTION");
    }

    @Override
    protected void configure(@NotNull HttpSecurity http) throws Exception {
        http.httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/v1/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/v1/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/v1/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/v1/**").hasRole("ADMIN")
                .and()
                .csrf().disable()
                .formLogin().disable();
    }
}
