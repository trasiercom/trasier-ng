import { TRASIER_INTERCEPTOR, TrasierNgInterceptor } from './trasier-ng.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrasierNgService } from './trasier-ng.service';
import { TRASIER_HEADERS } from './trasier-headers';
import { Injectable } from '@angular/core';

describe('TrasierNgInterceptor', () => {
  let httpMock: HttpTestingController;
  let testService: TestService;
  let trasierService: TrasierNgService;

  @Injectable()
  class TestService {
    readonly TEST_URL = 'https://test.com';

    constructor(private http: HttpClient) {}

    public getResource(): Observable<any> {
      return this.http.get(this.TEST_URL);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TRASIER_INTERCEPTOR, TestService, TrasierNgService]
    });
    httpMock = TestBed.get(HttpTestingController);
    testService = TestBed.get(TestService);
    trasierService = TestBed.get(TrasierNgService);
  });

  it('should append the headers if the trasierService returns a conversation', () => {
    const conversationId = 'mockedConversationId';
    const traceId = 'traceId';
    const spanId = 'spanId';
    const conversation = { conversationId, traceId, spanId };
    spyOn(trasierService, 'getConversation').and.returnValue(conversation);

    testService.getResource().subscribe();
    const httpRequest = httpMock.expectOne(testService.TEST_URL);

    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_CONVERSATION_ID)).toBe(conversationId);
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_TRACE_ID)).toBe(traceId);
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_SPAN_ID)).toBe(spanId);
  });

  it('should not append any headers if the trasierService does not return a conversation', () => {
    spyOn(trasierService, 'getConversation').and.returnValue(null);

    testService.getResource().subscribe();
    const httpRequest = httpMock.expectOne(testService.TEST_URL);

    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_CONVERSATION_ID)).toBeNull();
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_TRACE_ID)).toBeNull();
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_SPAN_ID)).toBeNull();
  });
});
