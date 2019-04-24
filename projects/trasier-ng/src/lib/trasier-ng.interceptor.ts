import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrasierNgService } from './trasier-ng.service';
import { TRASIER_HEADERS } from './trasier-headers';

@Injectable()
export class TrasierNgInterceptor implements HttpInterceptor {
  constructor(private trasierService: TrasierNgService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const conversation = this.trasierService.getConversation();
    if (!conversation) {
      return next.handle(req);
    }
    const headers = req.headers
      .append(TRASIER_HEADERS.HEADER_CONVERSATION_ID, conversation.conversationId)
      .append(TRASIER_HEADERS.HEADER_TRACE_ID, conversation.traceId)
      .append(TRASIER_HEADERS.HEADER_SPAN_ID, conversation.spanId);
    return next.handle(req.clone({ headers }));
  }
}

export const TRASIER_INTERCEPTOR: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TrasierNgInterceptor,
  multi: true
};
