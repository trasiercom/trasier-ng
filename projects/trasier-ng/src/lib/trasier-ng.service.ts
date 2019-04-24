import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';

interface TrasierConversation {
  conversationId: string;
  traceId: string;
  spanId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrasierNgService {

  private readonly TRASIER_CONVERSATION_KEY = 'trasier-conversation';

  public initConversation(): void {
    const conversation = {
      conversationId: UUID.UUID(),
      traceId: UUID.UUID(),
      spanId: UUID.UUID()
    };
    sessionStorage.setItem(this.TRASIER_CONVERSATION_KEY, JSON.stringify(conversation));
  }

  public getConversation(): TrasierConversation | null {
    const conversation = sessionStorage.getItem(this.TRASIER_CONVERSATION_KEY);
    return conversation ? JSON.parse(conversation) : null;
  }

  public endConversation(): void {
    sessionStorage.removeItem(this.TRASIER_CONVERSATION_KEY);
  }

}
