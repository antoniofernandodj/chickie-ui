import * as protobuf from 'protobufjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * Define a base class for Protobuf handling.
 * This class provides methods to serialize and deserialize data using Protobuf.
 */
export abstract class ProtobufBaseService {
  /**
   * Abstract method to get the default Protobuf message type for the specific service.
   * If a service uses multiple types, they can be passed as arguments to serialize/deserialize.
   */
  protected abstract getProtoType(): any;

  /**
   * Serialize the data into Protobuf binary format.
   * @param data The data to serialize.
   * @param type The Protobuf message type to use. Defaults to the service's default type.
   */
  serialize(data: any, type: any = this.getProtoType()): Uint8Array {
    return type.encode(data).finish();
  }

  /**
   * Deserialize Protobuf binary data into the specific object type.
   * @param message The Protobuf binary message.
   * @param type The Protobuf message type to use. Defaults to the service's default type.
   */
  deserialize<T>(message: Uint8Array, type: any = this.getProtoType()): T {
    return type.decode(message) as T;
  }

  /**
   * Encodes the data into Protobuf binary format and then return as a Base64 string.
   * Useful for cases where binary data cannot be sent directly.
   */
  encode(data: any, type: any = this.getProtoType()): string {
    const encoded = this.serialize(data, type);
    return btoa(String.fromCharCode(...encoded));
  }

  /**
   * Decodes a Base64 encoded Protobuf string back into the specific object.
   */
  decode<T>(base64Data: string, type: any = this.getProtoType()): T {
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return this.deserialize<T>(bytes, type);
  }

  /**
   * Helper method for HTTP GET requests that return Protobuf data.
   */
  protected getProto<T>(http: HttpClient, url: string, responseType: any): Observable<T> {
    return http.get(url, { responseType: 'arraybuffer' }).pipe(
      map(buffer => this.deserialize<T>(new Uint8Array(buffer), responseType))
    );
  }

  /**
   * Helper method for HTTP POST requests that send and return Protobuf data.
   */
  protected postProto<T>(http: HttpClient, url: string, body: any, responseType: any, requestType: any): Observable<T> {
    const serializedBody = this.serialize(body, requestType);
    return http.post(url, serializedBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-protobuf' }),
      responseType: 'arraybuffer'
    }).pipe(
      map(buffer => this.deserialize<T>(new Uint8Array(buffer), responseType))
    );
  }

  /**
   * Helper method for HTTP PUT requests that send and return Protobuf data.
   */
  protected putProto<T>(http: HttpClient, url: string, body: any, responseType: any, requestType: any): Observable<T> {
    const serializedBody = this.serialize(body, requestType);
    return http.put(url, serializedBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-protobuf' }),
      responseType: 'arraybuffer'
    }).pipe(
      map(buffer => this.deserialize<T>(new Uint8Array(buffer), responseType))
    );
  }

  /**
   * Helper method for HTTP PATCH requests that send and return Protobuf data.
   */
  protected patchProto<T>(http: HttpClient, url: string, body: any, responseType: any, requestType: any): Observable<T> {
    const serializedBody = this.serialize(body, requestType);
    return http.patch(url, serializedBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-protobuf' }),
      responseType: 'arraybuffer'
    }).pipe(
      map(buffer => this.deserialize<T>(new Uint8Array(buffer), responseType))
    );
  }

  /**
   * Helper method for HTTP DELETE requests that return Protobuf data.
   */
  protected deleteProto<T>(http: HttpClient, url: string, responseType: any): Observable<T> {
    return http.delete(url, { responseType: 'arraybuffer' }).pipe(
      map(buffer => this.deserialize<T>(new Uint8Array(buffer), responseType))
    );
  }
}
