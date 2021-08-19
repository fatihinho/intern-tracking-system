package com.fcinar.interntrackingsystem.configuration;

import com.fcinar.interntrackingsystem.model.UserTypes;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(@NotNull HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                .antMatchers("/api/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin().permitAll();
    }

    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        UserDetails adminUser = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin123"))
                .roles(UserTypes.ADMIN.name())
                .build();

        UserDetails internUser = User.builder()
                .username("intern")
                .password(passwordEncoder().encode("intern123"))
                .roles(UserTypes.INTERN.name())
                .build();

        UserDetails companyUser = User.builder()
                .username("company")
                .password(passwordEncoder().encode("company123"))
                .roles(UserTypes.COMPANY.name())
                .build();

        UserDetails institutionUser = User.builder()
                .username("institution")
                .password(passwordEncoder().encode("institution123"))
                .roles(UserTypes.INSTITUTION.name())
                .build();

        return new InMemoryUserDetailsManager(
                adminUser,
                internUser,
                companyUser,
                institutionUser
        );
    }
}
