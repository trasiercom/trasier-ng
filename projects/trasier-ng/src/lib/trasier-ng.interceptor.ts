import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { ClassProvider, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrasierConversation, TrasierNgService } from './trasier-ng.service';
import { TRASIER_HEADERS } from './trasier-headers';

@Injectable()
export class TrasierNgInterceptor implements HttpInterceptor {
  constructor(private trasierService: TrasierNgService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const conversation = this.trasierService.getConversation();
    if (!conversation) {
      return next.handle(req);
    }
    return next.handle(req.clone({ headers: this.appendTrasierHeaders(req, conversation) }));
  }

  private appendTrasierHeaders(request: HttpRequest<any>, conversation: TrasierConversation): HttpHeaders {
    let headers = request.headers.append(TRASIER_HEADERS.HEADER_CONVERSATION_ID, conversation.conversationId);
    if (conversation.systemName) {
      headers = headers.append(TRASIER_HEADERS.INCOMING_ENDPOINT_NAME, conversation.systemName);
    }
    return headers;
  }
}

export const TRASIER_INTERCEPTOR: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TrasierNgInterceptor,
  multi: true
};
