class LinkedList {

  public head: LinkedListNode | null;

  /** Creates an empty LinkedList */
  constructor() {
    this.head = null;
  }

  /** Inserts an element at the end of the list and returns the list. */
  public insert(newNode: LinkedListNode): LinkedList {
    if (this.head == null) this.head = newNode;
    else {
      let current = this.head;  

      while (current.next != null)  
      current = current.next;       

      current.next = newNode;   
    }
    return this;
  }

  /** Deletes the last element of the list and returns the list. */
  public pop(): LinkedList {
    if (this.head != null) {
      if (this.head.next == null) this.head = null;
      else {
        let current = this.head;
        while (current.next?.next != null)
          current = current.next;
        
        current.next = null;
      }
    }
    return this;
  }

  /** Returns the last element of the list. */
  public last(): LinkedListNode | null {
    if (this.head != null) {
      let current = this.head;

      while (current.next != null)
        current = current.next;
      
      return current;
    }
    return null
  }

  /**
   * Searches for a LinkedListNode.
   * @param id id to search for.
   * @returns either the LinkedListNode or null, if not found.
  */
  public search(id: string): LinkedListNode | null {
    let current = this.head;
    
    while (current != null && current.id != id)
      current = current.next;
    
    return current;
  }

  /**
   * Deletes the corresponding LinkedListNode(s).
   * @param id id to delete.
   * @returns the list.
  */
  public delete(id: string): LinkedList {
    this.sort();
    // console.log('On duty to delete elements with id "' + id + '"');
    if (this.search(id) != null) {
      // console.log('ID is contained!');

      let current = this.head;

      if (this.head != null && this.head.id == id) {
        this.head = this.head.next;
        current = null;
        // console.log('Deleting first Element!');
        // console.log('Repeating now...');
        this.delete(id);
        // console.log('Done deleting!');
        return this;
      }

      while (current!.next != null && current!.next.id != id)
        current = current!.next;
      
      // console.log('Next element is to delete!');
      let oldElement = current!.next;
      current!.next = current!.next!.next;
      oldElement = null

      // console.log('Repeating now...');
      // console.log('---------------------')
      this.delete(id);
    }
    // console.log('Done deleting!');
    return this;
  }

  public sort(): LinkedList {
    if (this.head != null) {
      // current zeigt auf das Element, das mit dem Nachfolger (falls vorhanden)
      // verglichen wird
      let current = this.head;
    
      while (current.next != null) {
        // Wenn der Nachfolger größer als current.id ist, muss nichts verändert
        // werden und es geht mit dem nächsten Element weiter
        if (current.next.id >= current.id) current = current.next;
    
        else {
          // Wenn der Nachfolger kleiner als current.id ist, wird dieser in current1
          // zwischengespeichert und current bekommt einen neuen Nachfolger
          const current1 = current.next;
          current.next = current.next.next;
        
          // Wenn current1 am Beginn der Liste eingefügt werden muss (= kleiner als das erste
          // Element ist), werden die Anweisungen im if-Teil ausgeführt, sonst die im
          // else-Teil.
          let current2 = this.head;
        
          if (current2.id > current1.id) {
            current1.next = current2;
            this.head = current1;
          }
          else {
            // Der Hilfszeiger current2 wird vom Beginn der Liste durchgeschoben, bis der
            // Vorgänger von current1 gefunden wurde und dann wird current1 eingefügt.
            while (current2.next != null && current2.next.id <= current1.id)
              current2 = current2.next;
            
            current1.next = current2.next;
            current2.next = current1;
          }
        }
      }
    }
    return this;
  }

  /** Logs the LinkedList somewhat styled into the console. */
  public log(): void {
    console.log('###########################');
    console.log('LinkedList:');
    console.log('');
    if (this.head != null) {
      let current: LinkedListNode | null = this.head;
      while (current != null) {
        console.log('FieldID: ' + current.id);
        console.log('Content: ' + current.content);
        console.log('---------------------------');
        current = current.next;
      }
    }
    console.log('###########################');
  }
}

class LinkedListNode {
  public id:      string;
  public content: number | string;
  public next:    LinkedListNode | null;

  constructor(id: string, content: number | string) {
    this.id = id;
    this.content = content;
    this.next    = null;
  }

  public equals(toCheck: LinkedListNode | null): boolean {
    if (this.content == toCheck?.content && this.id == toCheck?.id)
      return true;
    return false;
  }
}

export default LinkedList;
export {
  LinkedListNode,
}