import { TrasierNgService } from './trasier-ng.service';
import { UUID } from 'angular2-uuid';

describe('TrasierNgService', () => {
  let sut: TrasierNgService;

  beforeEach(() => (sut = new TrasierNgService()));

  it('should genereate three new UUIDs (conversationId, traceId, spanId)', () => {
    const uuidSpy = spyOn(UUID, 'UUID');
    sut.initConversation();
    expect(uuidSpy).toHaveBeenCalledTimes(3);
  });

  it('should store and object with the conversationId, traceId and spanId in the sessionStorage', () => {
    const uuidMock = 'aa3c8af1-1fec-0a74-c52c-5cb529b3ff3f';
    const setItemSpy = spyOn(sessionStorage, 'setItem');
    const uuidSpy = spyOn(UUID, 'UUID');
    uuidSpy.and.returnValue(uuidMock);
    const expectedItem = JSON.stringify({
      conversationId: uuidMock,
      traceId: uuidMock,
      spanId: uuidMock
    });

    sut.initConversation();
    expect(setItemSpy).toHaveBeenCalledWith('trasier-conversation', expectedItem);
  });

  it('should return null if the session storage does not contain a conversation', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    expect(sut.getConversation()).toBeNull();
  });

  it('should return the parsed value from the session storage', () => {
    const conversation = { conversationId: 'conversationIdMock' };
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(conversation));
    expect(sut.getConversation() as any).toEqual(conversation);
  });

  it('should delete the item from the session storage', () => {
    spyOn(sessionStorage, 'removeItem');
    sut.endConversation();
    expect(sessionStorage.removeItem).toHaveBeenCalled();
  });
});
