package com.jobapplication.user_service.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

public class UserContext {

    public static Integer getUserId()
    {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if(requestAttributes != null)
        {
            HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
            if(request != null)
                return  Integer.parseInt(request.getAttribute("userId").toString());
        }
        return null;
    }
}
