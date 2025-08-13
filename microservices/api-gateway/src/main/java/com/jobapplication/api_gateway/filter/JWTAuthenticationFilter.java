package com.jobapplication.api_gateway.filter;

import com.jobapplication.api_gateway.utils.JWTUtils;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JWTAuthenticationFilter implements GlobalFilter, Ordered {

    private static final String BEARER_STRING = "Bearer ";

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String uriPath = exchange.getRequest().getURI().getPath();

        if(uriPath.startsWith("/user-service/auth") || uriPath.startsWith("/notification-service/subscribe"))
            return chain.filter(exchange);

        String token = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if(token == null || token.isEmpty())
        {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        token = token.substring(BEARER_STRING.length());

        if(JWTUtils.validateJWTToken(token, SECRET_KEY))
            return chain.filter(exchange);

        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
