import { TrasierNgService } from './trasier-ng.service';
import { UUID } from 'angular2-uuid';

describe('TrasierNgService', () => {
  let sut: TrasierNgService;

  beforeEach(() => (sut = new TrasierNgService()));

  it('should not store a systemname if init was not called', () => {
    const trasierConversationKey = 'trasier-conversation';
    const mockedUUID = 'e41ed90b-4820-6e95-6c4d-99bee706974b';
    spyOn(UUID, 'UUID').and.returnValue(mockedUUID);
    spyOn(sessionStorage, 'setItem');

    sut.startConversation();
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      trasierConversationKey,
      JSON.stringify({ conversationId: mockedUUID })
    );
  });

  it('should store the systemname if init was called', () => {
    const trasierConversationKey = 'trasier-conversation';
    const systemName = 'trasier-test-client';
    const mockedUUID = 'e41ed90b-4820-6e95-6c4d-99bee706974b';
    spyOn(UUID, 'UUID').and.returnValue(mockedUUID);
    spyOn(sessionStorage, 'setItem');

    sut.init(systemName);
    sut.startConversation();
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      trasierConversationKey,
      JSON.stringify({ conversationId: mockedUUID, systemName })
    );
  });

  it('should genereate three a new conversationId', () => {
    const uuidSpy = spyOn(UUID, 'UUID');
    sut.startConversation();
    expect(uuidSpy).toHaveBeenCalledTimes(1);
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
