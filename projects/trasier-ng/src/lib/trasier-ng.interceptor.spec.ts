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
    const systemName = 'trasier-test-client';
    const conversation = { conversationId, systemName };
    spyOn(trasierService, 'getConversation').and.returnValue(conversation);

    testService.getResource().subscribe();
    const httpRequest = httpMock.expectOne(testService.TEST_URL);

    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_CONVERSATION_ID)).toBe(conversationId);
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.INCOMING_ENDPOINT_NAME)).toBe(systemName);
  });

  it('should not append the incoming endpoint header if the trasierService does not return a incoming header in the conversation', () => {
    const conversationId = 'mockedConversationId';
    spyOn(trasierService, 'getConversation').and.returnValue({ conversationId });

    testService.getResource().subscribe();
    const httpRequest = httpMock.expectOne(testService.TEST_URL);

    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_CONVERSATION_ID)).toBe(conversationId);
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.INCOMING_ENDPOINT_NAME)).toBeNull();
  });

  it('should not append any headers if the trasierService does not return a conversation', () => {
    spyOn(trasierService, 'getConversation').and.returnValue(null);

    testService.getResource().subscribe();
    const httpRequest = httpMock.expectOne(testService.TEST_URL);

    expect(httpRequest.request.headers.get(TRASIER_HEADERS.HEADER_CONVERSATION_ID)).toBeNull();
    expect(httpRequest.request.headers.get(TRASIER_HEADERS.INCOMING_ENDPOINT_NAME)).toBeNull();
  });
});
