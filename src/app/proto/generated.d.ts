import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace chickie. */
export namespace chickie {

    /** Properties of a CreateUsuarioRequest. */
    interface ICreateUsuarioRequest {

        /** CreateUsuarioRequest nome */
        nome?: (string|null);

        /** CreateUsuarioRequest username */
        username?: (string|null);

        /** CreateUsuarioRequest senha */
        senha?: (string|null);

        /** CreateUsuarioRequest email */
        email?: (string|null);

        /** CreateUsuarioRequest celular */
        celular?: (string|null);

        /** CreateUsuarioRequest auth_method */
        auth_method?: (string|null);

        /** CreateUsuarioRequest classe */
        classe?: (string|null);
    }

    /** Represents a CreateUsuarioRequest. */
    class CreateUsuarioRequest implements ICreateUsuarioRequest {

        /**
         * Constructs a new CreateUsuarioRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICreateUsuarioRequest);

        /** CreateUsuarioRequest nome. */
        public nome: string;

        /** CreateUsuarioRequest username. */
        public username: string;

        /** CreateUsuarioRequest senha. */
        public senha: string;

        /** CreateUsuarioRequest email. */
        public email: string;

        /** CreateUsuarioRequest celular. */
        public celular: string;

        /** CreateUsuarioRequest auth_method. */
        public auth_method: string;

        /** CreateUsuarioRequest classe. */
        public classe: string;

        /**
         * Creates a new CreateUsuarioRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateUsuarioRequest instance
         */
        public static create(properties?: chickie.ICreateUsuarioRequest): chickie.CreateUsuarioRequest;

        /**
         * Encodes the specified CreateUsuarioRequest message. Does not implicitly {@link chickie.CreateUsuarioRequest.verify|verify} messages.
         * @param message CreateUsuarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICreateUsuarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateUsuarioRequest message, length delimited. Does not implicitly {@link chickie.CreateUsuarioRequest.verify|verify} messages.
         * @param message CreateUsuarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICreateUsuarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateUsuarioRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateUsuarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CreateUsuarioRequest;

        /**
         * Decodes a CreateUsuarioRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateUsuarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CreateUsuarioRequest;

        /**
         * Verifies a CreateUsuarioRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateUsuarioRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateUsuarioRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CreateUsuarioRequest;

        /**
         * Creates a plain object from a CreateUsuarioRequest message. Also converts values to other types if specified.
         * @param message CreateUsuarioRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CreateUsuarioRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateUsuarioRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateUsuarioRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LoginRequest. */
    interface ILoginRequest {

        /** LoginRequest identifier */
        identifier?: (string|null);

        /** LoginRequest senha */
        senha?: (string|null);
    }

    /** Represents a LoginRequest. */
    class LoginRequest implements ILoginRequest {

        /**
         * Constructs a new LoginRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ILoginRequest);

        /** LoginRequest identifier. */
        public identifier: string;

        /** LoginRequest senha. */
        public senha: string;

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRequest instance
         */
        public static create(properties?: chickie.ILoginRequest): chickie.LoginRequest;

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link chickie.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link chickie.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.LoginRequest;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.LoginRequest;

        /**
         * Verifies a LoginRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.LoginRequest;

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @param message LoginRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LoginRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VerificarEmailRequest. */
    interface IVerificarEmailRequest {

        /** VerificarEmailRequest email */
        email?: (string|null);
    }

    /** Represents a VerificarEmailRequest. */
    class VerificarEmailRequest implements IVerificarEmailRequest {

        /**
         * Constructs a new VerificarEmailRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IVerificarEmailRequest);

        /** VerificarEmailRequest email. */
        public email: string;

        /**
         * Creates a new VerificarEmailRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerificarEmailRequest instance
         */
        public static create(properties?: chickie.IVerificarEmailRequest): chickie.VerificarEmailRequest;

        /**
         * Encodes the specified VerificarEmailRequest message. Does not implicitly {@link chickie.VerificarEmailRequest.verify|verify} messages.
         * @param message VerificarEmailRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IVerificarEmailRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerificarEmailRequest message, length delimited. Does not implicitly {@link chickie.VerificarEmailRequest.verify|verify} messages.
         * @param message VerificarEmailRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IVerificarEmailRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerificarEmailRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerificarEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.VerificarEmailRequest;

        /**
         * Decodes a VerificarEmailRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerificarEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.VerificarEmailRequest;

        /**
         * Verifies a VerificarEmailRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerificarEmailRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerificarEmailRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.VerificarEmailRequest;

        /**
         * Creates a plain object from a VerificarEmailRequest message. Also converts values to other types if specified.
         * @param message VerificarEmailRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.VerificarEmailRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerificarEmailRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VerificarEmailRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VerificarUsernameRequest. */
    interface IVerificarUsernameRequest {

        /** VerificarUsernameRequest username */
        username?: (string|null);
    }

    /** Represents a VerificarUsernameRequest. */
    class VerificarUsernameRequest implements IVerificarUsernameRequest {

        /**
         * Constructs a new VerificarUsernameRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IVerificarUsernameRequest);

        /** VerificarUsernameRequest username. */
        public username: string;

        /**
         * Creates a new VerificarUsernameRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerificarUsernameRequest instance
         */
        public static create(properties?: chickie.IVerificarUsernameRequest): chickie.VerificarUsernameRequest;

        /**
         * Encodes the specified VerificarUsernameRequest message. Does not implicitly {@link chickie.VerificarUsernameRequest.verify|verify} messages.
         * @param message VerificarUsernameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IVerificarUsernameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerificarUsernameRequest message, length delimited. Does not implicitly {@link chickie.VerificarUsernameRequest.verify|verify} messages.
         * @param message VerificarUsernameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IVerificarUsernameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerificarUsernameRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerificarUsernameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.VerificarUsernameRequest;

        /**
         * Decodes a VerificarUsernameRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerificarUsernameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.VerificarUsernameRequest;

        /**
         * Verifies a VerificarUsernameRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerificarUsernameRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerificarUsernameRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.VerificarUsernameRequest;

        /**
         * Creates a plain object from a VerificarUsernameRequest message. Also converts values to other types if specified.
         * @param message VerificarUsernameRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.VerificarUsernameRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerificarUsernameRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VerificarUsernameRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VerificarCelularRequest. */
    interface IVerificarCelularRequest {

        /** VerificarCelularRequest celular */
        celular?: (string|null);
    }

    /** Represents a VerificarCelularRequest. */
    class VerificarCelularRequest implements IVerificarCelularRequest {

        /**
         * Constructs a new VerificarCelularRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IVerificarCelularRequest);

        /** VerificarCelularRequest celular. */
        public celular: string;

        /**
         * Creates a new VerificarCelularRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerificarCelularRequest instance
         */
        public static create(properties?: chickie.IVerificarCelularRequest): chickie.VerificarCelularRequest;

        /**
         * Encodes the specified VerificarCelularRequest message. Does not implicitly {@link chickie.VerificarCelularRequest.verify|verify} messages.
         * @param message VerificarCelularRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IVerificarCelularRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerificarCelularRequest message, length delimited. Does not implicitly {@link chickie.VerificarCelularRequest.verify|verify} messages.
         * @param message VerificarCelularRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IVerificarCelularRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerificarCelularRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerificarCelularRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.VerificarCelularRequest;

        /**
         * Decodes a VerificarCelularRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerificarCelularRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.VerificarCelularRequest;

        /**
         * Verifies a VerificarCelularRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerificarCelularRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerificarCelularRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.VerificarCelularRequest;

        /**
         * Creates a plain object from a VerificarCelularRequest message. Also converts values to other types if specified.
         * @param message VerificarCelularRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.VerificarCelularRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerificarCelularRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VerificarCelularRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AlternarAtivoRequest. */
    interface IAlternarAtivoRequest {

        /** AlternarAtivoRequest ativo */
        ativo?: (boolean|null);
    }

    /** Represents an AlternarAtivoRequest. */
    class AlternarAtivoRequest implements IAlternarAtivoRequest {

        /**
         * Constructs a new AlternarAtivoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAlternarAtivoRequest);

        /** AlternarAtivoRequest ativo. */
        public ativo: boolean;

        /**
         * Creates a new AlternarAtivoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AlternarAtivoRequest instance
         */
        public static create(properties?: chickie.IAlternarAtivoRequest): chickie.AlternarAtivoRequest;

        /**
         * Encodes the specified AlternarAtivoRequest message. Does not implicitly {@link chickie.AlternarAtivoRequest.verify|verify} messages.
         * @param message AlternarAtivoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAlternarAtivoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AlternarAtivoRequest message, length delimited. Does not implicitly {@link chickie.AlternarAtivoRequest.verify|verify} messages.
         * @param message AlternarAtivoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAlternarAtivoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AlternarAtivoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AlternarAtivoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AlternarAtivoRequest;

        /**
         * Decodes an AlternarAtivoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AlternarAtivoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AlternarAtivoRequest;

        /**
         * Verifies an AlternarAtivoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AlternarAtivoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AlternarAtivoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AlternarAtivoRequest;

        /**
         * Creates a plain object from an AlternarAtivoRequest message. Also converts values to other types if specified.
         * @param message AlternarAtivoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AlternarAtivoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AlternarAtivoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AlternarAtivoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarDisponibilidadeRequest. */
    interface IAtualizarDisponibilidadeRequest {

        /** AtualizarDisponibilidadeRequest disponivel */
        disponivel?: (boolean|null);
    }

    /** Represents an AtualizarDisponibilidadeRequest. */
    class AtualizarDisponibilidadeRequest implements IAtualizarDisponibilidadeRequest {

        /**
         * Constructs a new AtualizarDisponibilidadeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarDisponibilidadeRequest);

        /** AtualizarDisponibilidadeRequest disponivel. */
        public disponivel: boolean;

        /**
         * Creates a new AtualizarDisponibilidadeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarDisponibilidadeRequest instance
         */
        public static create(properties?: chickie.IAtualizarDisponibilidadeRequest): chickie.AtualizarDisponibilidadeRequest;

        /**
         * Encodes the specified AtualizarDisponibilidadeRequest message. Does not implicitly {@link chickie.AtualizarDisponibilidadeRequest.verify|verify} messages.
         * @param message AtualizarDisponibilidadeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarDisponibilidadeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarDisponibilidadeRequest message, length delimited. Does not implicitly {@link chickie.AtualizarDisponibilidadeRequest.verify|verify} messages.
         * @param message AtualizarDisponibilidadeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarDisponibilidadeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarDisponibilidadeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarDisponibilidadeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarDisponibilidadeRequest;

        /**
         * Decodes an AtualizarDisponibilidadeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarDisponibilidadeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarDisponibilidadeRequest;

        /**
         * Verifies an AtualizarDisponibilidadeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarDisponibilidadeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarDisponibilidadeRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarDisponibilidadeRequest;

        /**
         * Creates a plain object from an AtualizarDisponibilidadeRequest message. Also converts values to other types if specified.
         * @param message AtualizarDisponibilidadeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarDisponibilidadeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarDisponibilidadeRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarDisponibilidadeRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TrocarEmailSenhaRequest. */
    interface ITrocarEmailSenhaRequest {

        /** TrocarEmailSenhaRequest novo_email */
        novo_email?: (string|null);

        /** TrocarEmailSenhaRequest nova_senha */
        nova_senha?: (string|null);
    }

    /** Represents a TrocarEmailSenhaRequest. */
    class TrocarEmailSenhaRequest implements ITrocarEmailSenhaRequest {

        /**
         * Constructs a new TrocarEmailSenhaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ITrocarEmailSenhaRequest);

        /** TrocarEmailSenhaRequest novo_email. */
        public novo_email: string;

        /** TrocarEmailSenhaRequest nova_senha. */
        public nova_senha: string;

        /**
         * Creates a new TrocarEmailSenhaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TrocarEmailSenhaRequest instance
         */
        public static create(properties?: chickie.ITrocarEmailSenhaRequest): chickie.TrocarEmailSenhaRequest;

        /**
         * Encodes the specified TrocarEmailSenhaRequest message. Does not implicitly {@link chickie.TrocarEmailSenhaRequest.verify|verify} messages.
         * @param message TrocarEmailSenhaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ITrocarEmailSenhaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TrocarEmailSenhaRequest message, length delimited. Does not implicitly {@link chickie.TrocarEmailSenhaRequest.verify|verify} messages.
         * @param message TrocarEmailSenhaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ITrocarEmailSenhaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TrocarEmailSenhaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TrocarEmailSenhaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.TrocarEmailSenhaRequest;

        /**
         * Decodes a TrocarEmailSenhaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TrocarEmailSenhaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.TrocarEmailSenhaRequest;

        /**
         * Verifies a TrocarEmailSenhaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TrocarEmailSenhaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TrocarEmailSenhaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.TrocarEmailSenhaRequest;

        /**
         * Creates a plain object from a TrocarEmailSenhaRequest message. Also converts values to other types if specified.
         * @param message TrocarEmailSenhaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.TrocarEmailSenhaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TrocarEmailSenhaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TrocarEmailSenhaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateLojaRequest. */
    interface ICreateLojaRequest {

        /** CreateLojaRequest nome */
        nome?: (string|null);

        /** CreateLojaRequest slug */
        slug?: (string|null);

        /** CreateLojaRequest email_contato */
        email_contato?: (string|null);

        /** CreateLojaRequest descricao */
        descricao?: (string|null);

        /** CreateLojaRequest celular */
        celular?: (string|null);

        /** CreateLojaRequest hora_abertura */
        hora_abertura?: (string|null);

        /** CreateLojaRequest hora_fechamento */
        hora_fechamento?: (string|null);

        /** CreateLojaRequest dias_funcionamento */
        dias_funcionamento?: (string|null);

        /** CreateLojaRequest tempo_medio */
        tempo_medio?: (number|null);

        /** CreateLojaRequest nota_media */
        nota_media?: (number|null);

        /** CreateLojaRequest taxa_entrega_base */
        taxa_entrega_base?: (number|null);

        /** CreateLojaRequest pedido_minimo */
        pedido_minimo?: (number|null);

        /** CreateLojaRequest max_partes */
        max_partes?: (number|null);
    }

    /** Represents a CreateLojaRequest. */
    class CreateLojaRequest implements ICreateLojaRequest {

        /**
         * Constructs a new CreateLojaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICreateLojaRequest);

        /** CreateLojaRequest nome. */
        public nome: string;

        /** CreateLojaRequest slug. */
        public slug: string;

        /** CreateLojaRequest email_contato. */
        public email_contato: string;

        /** CreateLojaRequest descricao. */
        public descricao: string;

        /** CreateLojaRequest celular. */
        public celular: string;

        /** CreateLojaRequest hora_abertura. */
        public hora_abertura: string;

        /** CreateLojaRequest hora_fechamento. */
        public hora_fechamento: string;

        /** CreateLojaRequest dias_funcionamento. */
        public dias_funcionamento: string;

        /** CreateLojaRequest tempo_medio. */
        public tempo_medio: number;

        /** CreateLojaRequest nota_media. */
        public nota_media: number;

        /** CreateLojaRequest taxa_entrega_base. */
        public taxa_entrega_base: number;

        /** CreateLojaRequest pedido_minimo. */
        public pedido_minimo: number;

        /** CreateLojaRequest max_partes. */
        public max_partes: number;

        /**
         * Creates a new CreateLojaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateLojaRequest instance
         */
        public static create(properties?: chickie.ICreateLojaRequest): chickie.CreateLojaRequest;

        /**
         * Encodes the specified CreateLojaRequest message. Does not implicitly {@link chickie.CreateLojaRequest.verify|verify} messages.
         * @param message CreateLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICreateLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateLojaRequest message, length delimited. Does not implicitly {@link chickie.CreateLojaRequest.verify|verify} messages.
         * @param message CreateLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICreateLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateLojaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CreateLojaRequest;

        /**
         * Decodes a CreateLojaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CreateLojaRequest;

        /**
         * Verifies a CreateLojaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateLojaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateLojaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CreateLojaRequest;

        /**
         * Creates a plain object from a CreateLojaRequest message. Also converts values to other types if specified.
         * @param message CreateLojaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CreateLojaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateLojaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateLojaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateProdutoRequest. */
    interface ICreateProdutoRequest {

        /** CreateProdutoRequest loja_uuid */
        loja_uuid?: (string|null);

        /** CreateProdutoRequest categoria_uuid */
        categoria_uuid?: (string|null);

        /** CreateProdutoRequest nome */
        nome?: (string|null);

        /** CreateProdutoRequest descricao */
        descricao?: (string|null);

        /** CreateProdutoRequest preco */
        preco?: (number|null);

        /** CreateProdutoRequest imagem_url */
        imagem_url?: (string|null);

        /** CreateProdutoRequest disponivel */
        disponivel?: (boolean|null);

        /** CreateProdutoRequest tempo_preparo_min */
        tempo_preparo_min?: (number|null);

        /** CreateProdutoRequest destaque */
        destaque?: (boolean|null);
    }

    /** Represents a CreateProdutoRequest. */
    class CreateProdutoRequest implements ICreateProdutoRequest {

        /**
         * Constructs a new CreateProdutoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICreateProdutoRequest);

        /** CreateProdutoRequest loja_uuid. */
        public loja_uuid: string;

        /** CreateProdutoRequest categoria_uuid. */
        public categoria_uuid: string;

        /** CreateProdutoRequest nome. */
        public nome: string;

        /** CreateProdutoRequest descricao. */
        public descricao: string;

        /** CreateProdutoRequest preco. */
        public preco: number;

        /** CreateProdutoRequest imagem_url. */
        public imagem_url: string;

        /** CreateProdutoRequest disponivel. */
        public disponivel: boolean;

        /** CreateProdutoRequest tempo_preparo_min. */
        public tempo_preparo_min: number;

        /** CreateProdutoRequest destaque. */
        public destaque: boolean;

        /**
         * Creates a new CreateProdutoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateProdutoRequest instance
         */
        public static create(properties?: chickie.ICreateProdutoRequest): chickie.CreateProdutoRequest;

        /**
         * Encodes the specified CreateProdutoRequest message. Does not implicitly {@link chickie.CreateProdutoRequest.verify|verify} messages.
         * @param message CreateProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICreateProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateProdutoRequest message, length delimited. Does not implicitly {@link chickie.CreateProdutoRequest.verify|verify} messages.
         * @param message CreateProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICreateProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateProdutoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CreateProdutoRequest;

        /**
         * Decodes a CreateProdutoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CreateProdutoRequest;

        /**
         * Verifies a CreateProdutoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateProdutoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateProdutoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CreateProdutoRequest;

        /**
         * Creates a plain object from a CreateProdutoRequest message. Also converts values to other types if specified.
         * @param message CreateProdutoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CreateProdutoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateProdutoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateProdutoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarProdutoRequest. */
    interface IAtualizarProdutoRequest {

        /** AtualizarProdutoRequest nome */
        nome?: (string|null);

        /** AtualizarProdutoRequest descricao */
        descricao?: (string|null);

        /** AtualizarProdutoRequest preco */
        preco?: (number|null);

        /** AtualizarProdutoRequest categoria_uuid */
        categoria_uuid?: (string|null);

        /** AtualizarProdutoRequest tempo_preparo_min */
        tempo_preparo_min?: (number|null);
    }

    /** Represents an AtualizarProdutoRequest. */
    class AtualizarProdutoRequest implements IAtualizarProdutoRequest {

        /**
         * Constructs a new AtualizarProdutoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarProdutoRequest);

        /** AtualizarProdutoRequest nome. */
        public nome: string;

        /** AtualizarProdutoRequest descricao. */
        public descricao: string;

        /** AtualizarProdutoRequest preco. */
        public preco: number;

        /** AtualizarProdutoRequest categoria_uuid. */
        public categoria_uuid: string;

        /** AtualizarProdutoRequest tempo_preparo_min. */
        public tempo_preparo_min: number;

        /**
         * Creates a new AtualizarProdutoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarProdutoRequest instance
         */
        public static create(properties?: chickie.IAtualizarProdutoRequest): chickie.AtualizarProdutoRequest;

        /**
         * Encodes the specified AtualizarProdutoRequest message. Does not implicitly {@link chickie.AtualizarProdutoRequest.verify|verify} messages.
         * @param message AtualizarProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarProdutoRequest message, length delimited. Does not implicitly {@link chickie.AtualizarProdutoRequest.verify|verify} messages.
         * @param message AtualizarProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarProdutoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarProdutoRequest;

        /**
         * Decodes an AtualizarProdutoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarProdutoRequest;

        /**
         * Verifies an AtualizarProdutoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarProdutoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarProdutoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarProdutoRequest;

        /**
         * Creates a plain object from an AtualizarProdutoRequest message. Also converts values to other types if specified.
         * @param message AtualizarProdutoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarProdutoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarProdutoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarProdutoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateCategoriaRequest. */
    interface ICreateCategoriaRequest {

        /** CreateCategoriaRequest nome */
        nome?: (string|null);

        /** CreateCategoriaRequest descricao */
        descricao?: (string|null);

        /** CreateCategoriaRequest ordem */
        ordem?: (number|null);

        /** CreateCategoriaRequest pizza_mode */
        pizza_mode?: (boolean|null);
    }

    /** Represents a CreateCategoriaRequest. */
    class CreateCategoriaRequest implements ICreateCategoriaRequest {

        /**
         * Constructs a new CreateCategoriaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICreateCategoriaRequest);

        /** CreateCategoriaRequest nome. */
        public nome: string;

        /** CreateCategoriaRequest descricao. */
        public descricao: string;

        /** CreateCategoriaRequest ordem. */
        public ordem: number;

        /** CreateCategoriaRequest pizza_mode. */
        public pizza_mode: boolean;

        /**
         * Creates a new CreateCategoriaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateCategoriaRequest instance
         */
        public static create(properties?: chickie.ICreateCategoriaRequest): chickie.CreateCategoriaRequest;

        /**
         * Encodes the specified CreateCategoriaRequest message. Does not implicitly {@link chickie.CreateCategoriaRequest.verify|verify} messages.
         * @param message CreateCategoriaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICreateCategoriaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateCategoriaRequest message, length delimited. Does not implicitly {@link chickie.CreateCategoriaRequest.verify|verify} messages.
         * @param message CreateCategoriaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICreateCategoriaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateCategoriaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateCategoriaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CreateCategoriaRequest;

        /**
         * Decodes a CreateCategoriaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateCategoriaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CreateCategoriaRequest;

        /**
         * Verifies a CreateCategoriaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateCategoriaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateCategoriaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CreateCategoriaRequest;

        /**
         * Creates a plain object from a CreateCategoriaRequest message. Also converts values to other types if specified.
         * @param message CreateCategoriaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CreateCategoriaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateCategoriaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateCategoriaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateCategoriaRequest. */
    interface IUpdateCategoriaRequest {

        /** UpdateCategoriaRequest nome */
        nome?: (string|null);

        /** UpdateCategoriaRequest descricao */
        descricao?: (string|null);

        /** UpdateCategoriaRequest ordem */
        ordem?: (number|null);

        /** UpdateCategoriaRequest pizza_mode */
        pizza_mode?: (boolean|null);
    }

    /** Represents an UpdateCategoriaRequest. */
    class UpdateCategoriaRequest implements IUpdateCategoriaRequest {

        /**
         * Constructs a new UpdateCategoriaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IUpdateCategoriaRequest);

        /** UpdateCategoriaRequest nome. */
        public nome: string;

        /** UpdateCategoriaRequest descricao. */
        public descricao: string;

        /** UpdateCategoriaRequest ordem. */
        public ordem: number;

        /** UpdateCategoriaRequest pizza_mode. */
        public pizza_mode: boolean;

        /**
         * Creates a new UpdateCategoriaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateCategoriaRequest instance
         */
        public static create(properties?: chickie.IUpdateCategoriaRequest): chickie.UpdateCategoriaRequest;

        /**
         * Encodes the specified UpdateCategoriaRequest message. Does not implicitly {@link chickie.UpdateCategoriaRequest.verify|verify} messages.
         * @param message UpdateCategoriaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IUpdateCategoriaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateCategoriaRequest message, length delimited. Does not implicitly {@link chickie.UpdateCategoriaRequest.verify|verify} messages.
         * @param message UpdateCategoriaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IUpdateCategoriaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateCategoriaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateCategoriaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.UpdateCategoriaRequest;

        /**
         * Decodes an UpdateCategoriaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateCategoriaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.UpdateCategoriaRequest;

        /**
         * Verifies an UpdateCategoriaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateCategoriaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateCategoriaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.UpdateCategoriaRequest;

        /**
         * Creates a plain object from an UpdateCategoriaRequest message. Also converts values to other types if specified.
         * @param message UpdateCategoriaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.UpdateCategoriaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateCategoriaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateCategoriaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateAdicionalRequest. */
    interface ICreateAdicionalRequest {

        /** CreateAdicionalRequest nome */
        nome?: (string|null);

        /** CreateAdicionalRequest descricao */
        descricao?: (string|null);

        /** CreateAdicionalRequest preco */
        preco?: (number|null);
    }

    /** Represents a CreateAdicionalRequest. */
    class CreateAdicionalRequest implements ICreateAdicionalRequest {

        /**
         * Constructs a new CreateAdicionalRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICreateAdicionalRequest);

        /** CreateAdicionalRequest nome. */
        public nome: string;

        /** CreateAdicionalRequest descricao. */
        public descricao: string;

        /** CreateAdicionalRequest preco. */
        public preco: number;

        /**
         * Creates a new CreateAdicionalRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateAdicionalRequest instance
         */
        public static create(properties?: chickie.ICreateAdicionalRequest): chickie.CreateAdicionalRequest;

        /**
         * Encodes the specified CreateAdicionalRequest message. Does not implicitly {@link chickie.CreateAdicionalRequest.verify|verify} messages.
         * @param message CreateAdicionalRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICreateAdicionalRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateAdicionalRequest message, length delimited. Does not implicitly {@link chickie.CreateAdicionalRequest.verify|verify} messages.
         * @param message CreateAdicionalRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICreateAdicionalRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateAdicionalRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateAdicionalRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CreateAdicionalRequest;

        /**
         * Decodes a CreateAdicionalRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateAdicionalRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CreateAdicionalRequest;

        /**
         * Verifies a CreateAdicionalRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateAdicionalRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateAdicionalRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CreateAdicionalRequest;

        /**
         * Creates a plain object from a CreateAdicionalRequest message. Also converts values to other types if specified.
         * @param message CreateAdicionalRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CreateAdicionalRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateAdicionalRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateAdicionalRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateAdicionalRequest. */
    interface IUpdateAdicionalRequest {

        /** UpdateAdicionalRequest nome */
        nome?: (string|null);

        /** UpdateAdicionalRequest descricao */
        descricao?: (string|null);

        /** UpdateAdicionalRequest preco */
        preco?: (number|null);
    }

    /** Represents an UpdateAdicionalRequest. */
    class UpdateAdicionalRequest implements IUpdateAdicionalRequest {

        /**
         * Constructs a new UpdateAdicionalRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IUpdateAdicionalRequest);

        /** UpdateAdicionalRequest nome. */
        public nome: string;

        /** UpdateAdicionalRequest descricao. */
        public descricao: string;

        /** UpdateAdicionalRequest preco. */
        public preco: number;

        /**
         * Creates a new UpdateAdicionalRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateAdicionalRequest instance
         */
        public static create(properties?: chickie.IUpdateAdicionalRequest): chickie.UpdateAdicionalRequest;

        /**
         * Encodes the specified UpdateAdicionalRequest message. Does not implicitly {@link chickie.UpdateAdicionalRequest.verify|verify} messages.
         * @param message UpdateAdicionalRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IUpdateAdicionalRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateAdicionalRequest message, length delimited. Does not implicitly {@link chickie.UpdateAdicionalRequest.verify|verify} messages.
         * @param message UpdateAdicionalRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IUpdateAdicionalRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateAdicionalRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateAdicionalRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.UpdateAdicionalRequest;

        /**
         * Decodes an UpdateAdicionalRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateAdicionalRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.UpdateAdicionalRequest;

        /**
         * Verifies an UpdateAdicionalRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateAdicionalRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateAdicionalRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.UpdateAdicionalRequest;

        /**
         * Creates a plain object from an UpdateAdicionalRequest message. Also converts values to other types if specified.
         * @param message UpdateAdicionalRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.UpdateAdicionalRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateAdicionalRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateAdicionalRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarCupomRequest. */
    interface ICriarCupomRequest {

        /** CriarCupomRequest codigo */
        codigo?: (string|null);

        /** CriarCupomRequest descricao */
        descricao?: (string|null);

        /** CriarCupomRequest tipo_desconto */
        tipo_desconto?: (string|null);

        /** CriarCupomRequest valor_desconto */
        valor_desconto?: (number|null);

        /** CriarCupomRequest valor_minimo */
        valor_minimo?: (number|null);

        /** CriarCupomRequest data_validade */
        data_validade?: (string|null);

        /** CriarCupomRequest limite_uso */
        limite_uso?: (number|null);
    }

    /** Represents a CriarCupomRequest. */
    class CriarCupomRequest implements ICriarCupomRequest {

        /**
         * Constructs a new CriarCupomRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarCupomRequest);

        /** CriarCupomRequest codigo. */
        public codigo: string;

        /** CriarCupomRequest descricao. */
        public descricao: string;

        /** CriarCupomRequest tipo_desconto. */
        public tipo_desconto: string;

        /** CriarCupomRequest valor_desconto. */
        public valor_desconto: number;

        /** CriarCupomRequest valor_minimo. */
        public valor_minimo: number;

        /** CriarCupomRequest data_validade. */
        public data_validade: string;

        /** CriarCupomRequest limite_uso. */
        public limite_uso: number;

        /**
         * Creates a new CriarCupomRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarCupomRequest instance
         */
        public static create(properties?: chickie.ICriarCupomRequest): chickie.CriarCupomRequest;

        /**
         * Encodes the specified CriarCupomRequest message. Does not implicitly {@link chickie.CriarCupomRequest.verify|verify} messages.
         * @param message CriarCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarCupomRequest message, length delimited. Does not implicitly {@link chickie.CriarCupomRequest.verify|verify} messages.
         * @param message CriarCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarCupomRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarCupomRequest;

        /**
         * Decodes a CriarCupomRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarCupomRequest;

        /**
         * Verifies a CriarCupomRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarCupomRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarCupomRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarCupomRequest;

        /**
         * Creates a plain object from a CriarCupomRequest message. Also converts values to other types if specified.
         * @param message CriarCupomRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarCupomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarCupomRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarCupomRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarCupomGenericoRequest. */
    interface ICriarCupomGenericoRequest {

        /** CriarCupomGenericoRequest loja_uuid */
        loja_uuid?: (string|null);

        /** CriarCupomGenericoRequest codigo */
        codigo?: (string|null);

        /** CriarCupomGenericoRequest descricao */
        descricao?: (string|null);

        /** CriarCupomGenericoRequest tipo_desconto */
        tipo_desconto?: (string|null);

        /** CriarCupomGenericoRequest valor_desconto */
        valor_desconto?: (number|null);

        /** CriarCupomGenericoRequest valor_minimo */
        valor_minimo?: (number|null);

        /** CriarCupomGenericoRequest data_validade */
        data_validade?: (string|null);

        /** CriarCupomGenericoRequest limite_uso */
        limite_uso?: (number|null);
    }

    /** Represents a CriarCupomGenericoRequest. */
    class CriarCupomGenericoRequest implements ICriarCupomGenericoRequest {

        /**
         * Constructs a new CriarCupomGenericoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarCupomGenericoRequest);

        /** CriarCupomGenericoRequest loja_uuid. */
        public loja_uuid: string;

        /** CriarCupomGenericoRequest codigo. */
        public codigo: string;

        /** CriarCupomGenericoRequest descricao. */
        public descricao: string;

        /** CriarCupomGenericoRequest tipo_desconto. */
        public tipo_desconto: string;

        /** CriarCupomGenericoRequest valor_desconto. */
        public valor_desconto: number;

        /** CriarCupomGenericoRequest valor_minimo. */
        public valor_minimo: number;

        /** CriarCupomGenericoRequest data_validade. */
        public data_validade: string;

        /** CriarCupomGenericoRequest limite_uso. */
        public limite_uso: number;

        /**
         * Creates a new CriarCupomGenericoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarCupomGenericoRequest instance
         */
        public static create(properties?: chickie.ICriarCupomGenericoRequest): chickie.CriarCupomGenericoRequest;

        /**
         * Encodes the specified CriarCupomGenericoRequest message. Does not implicitly {@link chickie.CriarCupomGenericoRequest.verify|verify} messages.
         * @param message CriarCupomGenericoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarCupomGenericoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarCupomGenericoRequest message, length delimited. Does not implicitly {@link chickie.CriarCupomGenericoRequest.verify|verify} messages.
         * @param message CriarCupomGenericoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarCupomGenericoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarCupomGenericoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarCupomGenericoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarCupomGenericoRequest;

        /**
         * Decodes a CriarCupomGenericoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarCupomGenericoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarCupomGenericoRequest;

        /**
         * Verifies a CriarCupomGenericoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarCupomGenericoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarCupomGenericoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarCupomGenericoRequest;

        /**
         * Creates a plain object from a CriarCupomGenericoRequest message. Also converts values to other types if specified.
         * @param message CriarCupomGenericoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarCupomGenericoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarCupomGenericoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarCupomGenericoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarCupomRequest. */
    interface IAtualizarCupomRequest {

        /** AtualizarCupomRequest loja_uuid */
        loja_uuid?: (string|null);

        /** AtualizarCupomRequest codigo */
        codigo?: (string|null);

        /** AtualizarCupomRequest descricao */
        descricao?: (string|null);

        /** AtualizarCupomRequest tipo_desconto */
        tipo_desconto?: (string|null);

        /** AtualizarCupomRequest valor_desconto */
        valor_desconto?: (number|null);

        /** AtualizarCupomRequest valor_minimo */
        valor_minimo?: (number|null);

        /** AtualizarCupomRequest data_validade */
        data_validade?: (string|null);

        /** AtualizarCupomRequest limite_uso */
        limite_uso?: (number|null);
    }

    /** Represents an AtualizarCupomRequest. */
    class AtualizarCupomRequest implements IAtualizarCupomRequest {

        /**
         * Constructs a new AtualizarCupomRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarCupomRequest);

        /** AtualizarCupomRequest loja_uuid. */
        public loja_uuid: string;

        /** AtualizarCupomRequest codigo. */
        public codigo: string;

        /** AtualizarCupomRequest descricao. */
        public descricao: string;

        /** AtualizarCupomRequest tipo_desconto. */
        public tipo_desconto: string;

        /** AtualizarCupomRequest valor_desconto. */
        public valor_desconto: number;

        /** AtualizarCupomRequest valor_minimo. */
        public valor_minimo: number;

        /** AtualizarCupomRequest data_validade. */
        public data_validade: string;

        /** AtualizarCupomRequest limite_uso. */
        public limite_uso: number;

        /**
         * Creates a new AtualizarCupomRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarCupomRequest instance
         */
        public static create(properties?: chickie.IAtualizarCupomRequest): chickie.AtualizarCupomRequest;

        /**
         * Encodes the specified AtualizarCupomRequest message. Does not implicitly {@link chickie.AtualizarCupomRequest.verify|verify} messages.
         * @param message AtualizarCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarCupomRequest message, length delimited. Does not implicitly {@link chickie.AtualizarCupomRequest.verify|verify} messages.
         * @param message AtualizarCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarCupomRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarCupomRequest;

        /**
         * Decodes an AtualizarCupomRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarCupomRequest;

        /**
         * Verifies an AtualizarCupomRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarCupomRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarCupomRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarCupomRequest;

        /**
         * Creates a plain object from an AtualizarCupomRequest message. Also converts values to other types if specified.
         * @param message AtualizarCupomRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarCupomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarCupomRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarCupomRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarStatusCupomRequest. */
    interface IAtualizarStatusCupomRequest {

        /** AtualizarStatusCupomRequest ativo */
        ativo?: (boolean|null);
    }

    /** Represents an AtualizarStatusCupomRequest. */
    class AtualizarStatusCupomRequest implements IAtualizarStatusCupomRequest {

        /**
         * Constructs a new AtualizarStatusCupomRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarStatusCupomRequest);

        /** AtualizarStatusCupomRequest ativo. */
        public ativo: boolean;

        /**
         * Creates a new AtualizarStatusCupomRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarStatusCupomRequest instance
         */
        public static create(properties?: chickie.IAtualizarStatusCupomRequest): chickie.AtualizarStatusCupomRequest;

        /**
         * Encodes the specified AtualizarStatusCupomRequest message. Does not implicitly {@link chickie.AtualizarStatusCupomRequest.verify|verify} messages.
         * @param message AtualizarStatusCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarStatusCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarStatusCupomRequest message, length delimited. Does not implicitly {@link chickie.AtualizarStatusCupomRequest.verify|verify} messages.
         * @param message AtualizarStatusCupomRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarStatusCupomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarStatusCupomRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarStatusCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarStatusCupomRequest;

        /**
         * Decodes an AtualizarStatusCupomRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarStatusCupomRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarStatusCupomRequest;

        /**
         * Verifies an AtualizarStatusCupomRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarStatusCupomRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarStatusCupomRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarStatusCupomRequest;

        /**
         * Creates a plain object from an AtualizarStatusCupomRequest message. Also converts values to other types if specified.
         * @param message AtualizarStatusCupomRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarStatusCupomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarStatusCupomRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarStatusCupomRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EnderecoRequest. */
    interface IEnderecoRequest {

        /** EnderecoRequest cep */
        cep?: (string|null);

        /** EnderecoRequest logradouro */
        logradouro?: (string|null);

        /** EnderecoRequest numero */
        numero?: (string|null);

        /** EnderecoRequest complemento */
        complemento?: (string|null);

        /** EnderecoRequest bairro */
        bairro?: (string|null);

        /** EnderecoRequest cidade */
        cidade?: (string|null);

        /** EnderecoRequest estado */
        estado?: (string|null);

        /** EnderecoRequest latitude */
        latitude?: (number|null);

        /** EnderecoRequest longitude */
        longitude?: (number|null);
    }

    /** Represents an EnderecoRequest. */
    class EnderecoRequest implements IEnderecoRequest {

        /**
         * Constructs a new EnderecoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IEnderecoRequest);

        /** EnderecoRequest cep. */
        public cep: string;

        /** EnderecoRequest logradouro. */
        public logradouro: string;

        /** EnderecoRequest numero. */
        public numero: string;

        /** EnderecoRequest complemento. */
        public complemento: string;

        /** EnderecoRequest bairro. */
        public bairro: string;

        /** EnderecoRequest cidade. */
        public cidade: string;

        /** EnderecoRequest estado. */
        public estado: string;

        /** EnderecoRequest latitude. */
        public latitude: number;

        /** EnderecoRequest longitude. */
        public longitude: number;

        /**
         * Creates a new EnderecoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnderecoRequest instance
         */
        public static create(properties?: chickie.IEnderecoRequest): chickie.EnderecoRequest;

        /**
         * Encodes the specified EnderecoRequest message. Does not implicitly {@link chickie.EnderecoRequest.verify|verify} messages.
         * @param message EnderecoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IEnderecoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnderecoRequest message, length delimited. Does not implicitly {@link chickie.EnderecoRequest.verify|verify} messages.
         * @param message EnderecoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IEnderecoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnderecoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnderecoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.EnderecoRequest;

        /**
         * Decodes an EnderecoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnderecoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.EnderecoRequest;

        /**
         * Verifies an EnderecoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnderecoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnderecoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.EnderecoRequest;

        /**
         * Creates a plain object from an EnderecoRequest message. Also converts values to other types if specified.
         * @param message EnderecoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.EnderecoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnderecoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EnderecoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AdicionarClienteRequest. */
    interface IAdicionarClienteRequest {

        /** AdicionarClienteRequest nome */
        nome?: (string|null);

        /** AdicionarClienteRequest username */
        username?: (string|null);

        /** AdicionarClienteRequest email */
        email?: (string|null);

        /** AdicionarClienteRequest senha */
        senha?: (string|null);

        /** AdicionarClienteRequest celular */
        celular?: (string|null);
    }

    /** Represents an AdicionarClienteRequest. */
    class AdicionarClienteRequest implements IAdicionarClienteRequest {

        /**
         * Constructs a new AdicionarClienteRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAdicionarClienteRequest);

        /** AdicionarClienteRequest nome. */
        public nome: string;

        /** AdicionarClienteRequest username. */
        public username: string;

        /** AdicionarClienteRequest email. */
        public email: string;

        /** AdicionarClienteRequest senha. */
        public senha: string;

        /** AdicionarClienteRequest celular. */
        public celular: string;

        /**
         * Creates a new AdicionarClienteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdicionarClienteRequest instance
         */
        public static create(properties?: chickie.IAdicionarClienteRequest): chickie.AdicionarClienteRequest;

        /**
         * Encodes the specified AdicionarClienteRequest message. Does not implicitly {@link chickie.AdicionarClienteRequest.verify|verify} messages.
         * @param message AdicionarClienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAdicionarClienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdicionarClienteRequest message, length delimited. Does not implicitly {@link chickie.AdicionarClienteRequest.verify|verify} messages.
         * @param message AdicionarClienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAdicionarClienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdicionarClienteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdicionarClienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AdicionarClienteRequest;

        /**
         * Decodes an AdicionarClienteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdicionarClienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AdicionarClienteRequest;

        /**
         * Verifies an AdicionarClienteRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdicionarClienteRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdicionarClienteRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AdicionarClienteRequest;

        /**
         * Creates a plain object from an AdicionarClienteRequest message. Also converts values to other types if specified.
         * @param message AdicionarClienteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AdicionarClienteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdicionarClienteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AdicionarClienteRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AdicionarEntregadorRequest. */
    interface IAdicionarEntregadorRequest {

        /** AdicionarEntregadorRequest nome */
        nome?: (string|null);

        /** AdicionarEntregadorRequest username */
        username?: (string|null);

        /** AdicionarEntregadorRequest email */
        email?: (string|null);

        /** AdicionarEntregadorRequest senha */
        senha?: (string|null);

        /** AdicionarEntregadorRequest celular */
        celular?: (string|null);

        /** AdicionarEntregadorRequest veiculo */
        veiculo?: (string|null);

        /** AdicionarEntregadorRequest placa */
        placa?: (string|null);
    }

    /** Represents an AdicionarEntregadorRequest. */
    class AdicionarEntregadorRequest implements IAdicionarEntregadorRequest {

        /**
         * Constructs a new AdicionarEntregadorRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAdicionarEntregadorRequest);

        /** AdicionarEntregadorRequest nome. */
        public nome: string;

        /** AdicionarEntregadorRequest username. */
        public username: string;

        /** AdicionarEntregadorRequest email. */
        public email: string;

        /** AdicionarEntregadorRequest senha. */
        public senha: string;

        /** AdicionarEntregadorRequest celular. */
        public celular: string;

        /** AdicionarEntregadorRequest veiculo. */
        public veiculo: string;

        /** AdicionarEntregadorRequest placa. */
        public placa: string;

        /**
         * Creates a new AdicionarEntregadorRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdicionarEntregadorRequest instance
         */
        public static create(properties?: chickie.IAdicionarEntregadorRequest): chickie.AdicionarEntregadorRequest;

        /**
         * Encodes the specified AdicionarEntregadorRequest message. Does not implicitly {@link chickie.AdicionarEntregadorRequest.verify|verify} messages.
         * @param message AdicionarEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAdicionarEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdicionarEntregadorRequest message, length delimited. Does not implicitly {@link chickie.AdicionarEntregadorRequest.verify|verify} messages.
         * @param message AdicionarEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAdicionarEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdicionarEntregadorRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdicionarEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AdicionarEntregadorRequest;

        /**
         * Decodes an AdicionarEntregadorRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdicionarEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AdicionarEntregadorRequest;

        /**
         * Verifies an AdicionarEntregadorRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdicionarEntregadorRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdicionarEntregadorRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AdicionarEntregadorRequest;

        /**
         * Creates a plain object from an AdicionarEntregadorRequest message. Also converts values to other types if specified.
         * @param message AdicionarEntregadorRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AdicionarEntregadorRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdicionarEntregadorRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AdicionarEntregadorRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AdicionarFuncionarioRequest. */
    interface IAdicionarFuncionarioRequest {

        /** AdicionarFuncionarioRequest nome */
        nome?: (string|null);

        /** AdicionarFuncionarioRequest username */
        username?: (string|null);

        /** AdicionarFuncionarioRequest email */
        email?: (string|null);

        /** AdicionarFuncionarioRequest senha */
        senha?: (string|null);

        /** AdicionarFuncionarioRequest celular */
        celular?: (string|null);

        /** AdicionarFuncionarioRequest cargo */
        cargo?: (string|null);

        /** AdicionarFuncionarioRequest salario */
        salario?: (number|null);

        /** AdicionarFuncionarioRequest data_admissao */
        data_admissao?: (string|null);
    }

    /** Represents an AdicionarFuncionarioRequest. */
    class AdicionarFuncionarioRequest implements IAdicionarFuncionarioRequest {

        /**
         * Constructs a new AdicionarFuncionarioRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAdicionarFuncionarioRequest);

        /** AdicionarFuncionarioRequest nome. */
        public nome: string;

        /** AdicionarFuncionarioRequest username. */
        public username: string;

        /** AdicionarFuncionarioRequest email. */
        public email: string;

        /** AdicionarFuncionarioRequest senha. */
        public senha: string;

        /** AdicionarFuncionarioRequest celular. */
        public celular: string;

        /** AdicionarFuncionarioRequest cargo. */
        public cargo: string;

        /** AdicionarFuncionarioRequest salario. */
        public salario: number;

        /** AdicionarFuncionarioRequest data_admissao. */
        public data_admissao: string;

        /**
         * Creates a new AdicionarFuncionarioRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdicionarFuncionarioRequest instance
         */
        public static create(properties?: chickie.IAdicionarFuncionarioRequest): chickie.AdicionarFuncionarioRequest;

        /**
         * Encodes the specified AdicionarFuncionarioRequest message. Does not implicitly {@link chickie.AdicionarFuncionarioRequest.verify|verify} messages.
         * @param message AdicionarFuncionarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAdicionarFuncionarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdicionarFuncionarioRequest message, length delimited. Does not implicitly {@link chickie.AdicionarFuncionarioRequest.verify|verify} messages.
         * @param message AdicionarFuncionarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAdicionarFuncionarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdicionarFuncionarioRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdicionarFuncionarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AdicionarFuncionarioRequest;

        /**
         * Decodes an AdicionarFuncionarioRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdicionarFuncionarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AdicionarFuncionarioRequest;

        /**
         * Verifies an AdicionarFuncionarioRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdicionarFuncionarioRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdicionarFuncionarioRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AdicionarFuncionarioRequest;

        /**
         * Creates a plain object from an AdicionarFuncionarioRequest message. Also converts values to other types if specified.
         * @param message AdicionarFuncionarioRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AdicionarFuncionarioRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdicionarFuncionarioRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AdicionarFuncionarioRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarEntregadorRequest. */
    interface IAtualizarEntregadorRequest {

        /** AtualizarEntregadorRequest usuario_uuid */
        usuario_uuid?: (string|null);

        /** AtualizarEntregadorRequest nome */
        nome?: (string|null);

        /** AtualizarEntregadorRequest celular */
        celular?: (string|null);

        /** AtualizarEntregadorRequest veiculo */
        veiculo?: (string|null);

        /** AtualizarEntregadorRequest placa */
        placa?: (string|null);
    }

    /** Represents an AtualizarEntregadorRequest. */
    class AtualizarEntregadorRequest implements IAtualizarEntregadorRequest {

        /**
         * Constructs a new AtualizarEntregadorRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarEntregadorRequest);

        /** AtualizarEntregadorRequest usuario_uuid. */
        public usuario_uuid: string;

        /** AtualizarEntregadorRequest nome. */
        public nome: string;

        /** AtualizarEntregadorRequest celular. */
        public celular: string;

        /** AtualizarEntregadorRequest veiculo. */
        public veiculo: string;

        /** AtualizarEntregadorRequest placa. */
        public placa: string;

        /**
         * Creates a new AtualizarEntregadorRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarEntregadorRequest instance
         */
        public static create(properties?: chickie.IAtualizarEntregadorRequest): chickie.AtualizarEntregadorRequest;

        /**
         * Encodes the specified AtualizarEntregadorRequest message. Does not implicitly {@link chickie.AtualizarEntregadorRequest.verify|verify} messages.
         * @param message AtualizarEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarEntregadorRequest message, length delimited. Does not implicitly {@link chickie.AtualizarEntregadorRequest.verify|verify} messages.
         * @param message AtualizarEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarEntregadorRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarEntregadorRequest;

        /**
         * Decodes an AtualizarEntregadorRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarEntregadorRequest;

        /**
         * Verifies an AtualizarEntregadorRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarEntregadorRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarEntregadorRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarEntregadorRequest;

        /**
         * Creates a plain object from an AtualizarEntregadorRequest message. Also converts values to other types if specified.
         * @param message AtualizarEntregadorRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarEntregadorRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarEntregadorRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarEntregadorRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarFuncionarioRequest. */
    interface IAtualizarFuncionarioRequest {

        /** AtualizarFuncionarioRequest usuario_uuid */
        usuario_uuid?: (string|null);

        /** AtualizarFuncionarioRequest nome */
        nome?: (string|null);

        /** AtualizarFuncionarioRequest email */
        email?: (string|null);

        /** AtualizarFuncionarioRequest senha */
        senha?: (string|null);

        /** AtualizarFuncionarioRequest celular */
        celular?: (string|null);

        /** AtualizarFuncionarioRequest cargo */
        cargo?: (string|null);

        /** AtualizarFuncionarioRequest salario */
        salario?: (number|null);

        /** AtualizarFuncionarioRequest data_admissao */
        data_admissao?: (string|null);
    }

    /** Represents an AtualizarFuncionarioRequest. */
    class AtualizarFuncionarioRequest implements IAtualizarFuncionarioRequest {

        /**
         * Constructs a new AtualizarFuncionarioRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarFuncionarioRequest);

        /** AtualizarFuncionarioRequest usuario_uuid. */
        public usuario_uuid: string;

        /** AtualizarFuncionarioRequest nome. */
        public nome: string;

        /** AtualizarFuncionarioRequest email. */
        public email: string;

        /** AtualizarFuncionarioRequest senha. */
        public senha: string;

        /** AtualizarFuncionarioRequest celular. */
        public celular: string;

        /** AtualizarFuncionarioRequest cargo. */
        public cargo: string;

        /** AtualizarFuncionarioRequest salario. */
        public salario: number;

        /** AtualizarFuncionarioRequest data_admissao. */
        public data_admissao: string;

        /**
         * Creates a new AtualizarFuncionarioRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarFuncionarioRequest instance
         */
        public static create(properties?: chickie.IAtualizarFuncionarioRequest): chickie.AtualizarFuncionarioRequest;

        /**
         * Encodes the specified AtualizarFuncionarioRequest message. Does not implicitly {@link chickie.AtualizarFuncionarioRequest.verify|verify} messages.
         * @param message AtualizarFuncionarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarFuncionarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarFuncionarioRequest message, length delimited. Does not implicitly {@link chickie.AtualizarFuncionarioRequest.verify|verify} messages.
         * @param message AtualizarFuncionarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarFuncionarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarFuncionarioRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarFuncionarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarFuncionarioRequest;

        /**
         * Decodes an AtualizarFuncionarioRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarFuncionarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarFuncionarioRequest;

        /**
         * Verifies an AtualizarFuncionarioRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarFuncionarioRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarFuncionarioRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarFuncionarioRequest;

        /**
         * Creates a plain object from an AtualizarFuncionarioRequest message. Also converts values to other types if specified.
         * @param message AtualizarFuncionarioRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarFuncionarioRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarFuncionarioRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarFuncionarioRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SalvarConfigPedidoRequest. */
    interface ISalvarConfigPedidoRequest {

        /** SalvarConfigPedidoRequest max_partes */
        max_partes?: (number|null);

        /** SalvarConfigPedidoRequest tipo_calculo */
        tipo_calculo?: (string|null);
    }

    /** Represents a SalvarConfigPedidoRequest. */
    class SalvarConfigPedidoRequest implements ISalvarConfigPedidoRequest {

        /**
         * Constructs a new SalvarConfigPedidoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ISalvarConfigPedidoRequest);

        /** SalvarConfigPedidoRequest max_partes. */
        public max_partes: number;

        /** SalvarConfigPedidoRequest tipo_calculo. */
        public tipo_calculo: string;

        /**
         * Creates a new SalvarConfigPedidoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SalvarConfigPedidoRequest instance
         */
        public static create(properties?: chickie.ISalvarConfigPedidoRequest): chickie.SalvarConfigPedidoRequest;

        /**
         * Encodes the specified SalvarConfigPedidoRequest message. Does not implicitly {@link chickie.SalvarConfigPedidoRequest.verify|verify} messages.
         * @param message SalvarConfigPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ISalvarConfigPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SalvarConfigPedidoRequest message, length delimited. Does not implicitly {@link chickie.SalvarConfigPedidoRequest.verify|verify} messages.
         * @param message SalvarConfigPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ISalvarConfigPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SalvarConfigPedidoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SalvarConfigPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.SalvarConfigPedidoRequest;

        /**
         * Decodes a SalvarConfigPedidoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SalvarConfigPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.SalvarConfigPedidoRequest;

        /**
         * Verifies a SalvarConfigPedidoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SalvarConfigPedidoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SalvarConfigPedidoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.SalvarConfigPedidoRequest;

        /**
         * Creates a plain object from a SalvarConfigPedidoRequest message. Also converts values to other types if specified.
         * @param message SalvarConfigPedidoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.SalvarConfigPedidoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SalvarConfigPedidoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SalvarConfigPedidoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarOuAtualizarHorarioRequest. */
    interface ICriarOuAtualizarHorarioRequest {

        /** CriarOuAtualizarHorarioRequest dia_semana */
        dia_semana?: (number|null);

        /** CriarOuAtualizarHorarioRequest abertura */
        abertura?: (string|null);

        /** CriarOuAtualizarHorarioRequest fechamento */
        fechamento?: (string|null);

        /** CriarOuAtualizarHorarioRequest ativo */
        ativo?: (boolean|null);
    }

    /** Represents a CriarOuAtualizarHorarioRequest. */
    class CriarOuAtualizarHorarioRequest implements ICriarOuAtualizarHorarioRequest {

        /**
         * Constructs a new CriarOuAtualizarHorarioRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarOuAtualizarHorarioRequest);

        /** CriarOuAtualizarHorarioRequest dia_semana. */
        public dia_semana: number;

        /** CriarOuAtualizarHorarioRequest abertura. */
        public abertura: string;

        /** CriarOuAtualizarHorarioRequest fechamento. */
        public fechamento: string;

        /** CriarOuAtualizarHorarioRequest ativo. */
        public ativo: boolean;

        /**
         * Creates a new CriarOuAtualizarHorarioRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarOuAtualizarHorarioRequest instance
         */
        public static create(properties?: chickie.ICriarOuAtualizarHorarioRequest): chickie.CriarOuAtualizarHorarioRequest;

        /**
         * Encodes the specified CriarOuAtualizarHorarioRequest message. Does not implicitly {@link chickie.CriarOuAtualizarHorarioRequest.verify|verify} messages.
         * @param message CriarOuAtualizarHorarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarOuAtualizarHorarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarOuAtualizarHorarioRequest message, length delimited. Does not implicitly {@link chickie.CriarOuAtualizarHorarioRequest.verify|verify} messages.
         * @param message CriarOuAtualizarHorarioRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarOuAtualizarHorarioRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarOuAtualizarHorarioRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarOuAtualizarHorarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarOuAtualizarHorarioRequest;

        /**
         * Decodes a CriarOuAtualizarHorarioRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarOuAtualizarHorarioRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarOuAtualizarHorarioRequest;

        /**
         * Verifies a CriarOuAtualizarHorarioRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarOuAtualizarHorarioRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarOuAtualizarHorarioRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarOuAtualizarHorarioRequest;

        /**
         * Creates a plain object from a CriarOuAtualizarHorarioRequest message. Also converts values to other types if specified.
         * @param message CriarOuAtualizarHorarioRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarOuAtualizarHorarioRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarOuAtualizarHorarioRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarOuAtualizarHorarioRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DefinirAtivoRequest. */
    interface IDefinirAtivoRequest {

        /** DefinirAtivoRequest ativo */
        ativo?: (boolean|null);
    }

    /** Represents a DefinirAtivoRequest. */
    class DefinirAtivoRequest implements IDefinirAtivoRequest {

        /**
         * Constructs a new DefinirAtivoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IDefinirAtivoRequest);

        /** DefinirAtivoRequest ativo. */
        public ativo: boolean;

        /**
         * Creates a new DefinirAtivoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DefinirAtivoRequest instance
         */
        public static create(properties?: chickie.IDefinirAtivoRequest): chickie.DefinirAtivoRequest;

        /**
         * Encodes the specified DefinirAtivoRequest message. Does not implicitly {@link chickie.DefinirAtivoRequest.verify|verify} messages.
         * @param message DefinirAtivoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IDefinirAtivoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DefinirAtivoRequest message, length delimited. Does not implicitly {@link chickie.DefinirAtivoRequest.verify|verify} messages.
         * @param message DefinirAtivoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IDefinirAtivoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DefinirAtivoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DefinirAtivoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.DefinirAtivoRequest;

        /**
         * Decodes a DefinirAtivoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DefinirAtivoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.DefinirAtivoRequest;

        /**
         * Verifies a DefinirAtivoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DefinirAtivoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DefinirAtivoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.DefinirAtivoRequest;

        /**
         * Creates a plain object from a DefinirAtivoRequest message. Also converts values to other types if specified.
         * @param message DefinirAtivoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.DefinirAtivoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DefinirAtivoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DefinirAtivoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarIngredienteRequest. */
    interface ICriarIngredienteRequest {

        /** CriarIngredienteRequest nome */
        nome?: (string|null);

        /** CriarIngredienteRequest unidade_medida */
        unidade_medida?: (string|null);

        /** CriarIngredienteRequest preco_unitario */
        preco_unitario?: (number|null);
    }

    /** Represents a CriarIngredienteRequest. */
    class CriarIngredienteRequest implements ICriarIngredienteRequest {

        /**
         * Constructs a new CriarIngredienteRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarIngredienteRequest);

        /** CriarIngredienteRequest nome. */
        public nome: string;

        /** CriarIngredienteRequest unidade_medida. */
        public unidade_medida: string;

        /** CriarIngredienteRequest preco_unitario. */
        public preco_unitario: number;

        /**
         * Creates a new CriarIngredienteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarIngredienteRequest instance
         */
        public static create(properties?: chickie.ICriarIngredienteRequest): chickie.CriarIngredienteRequest;

        /**
         * Encodes the specified CriarIngredienteRequest message. Does not implicitly {@link chickie.CriarIngredienteRequest.verify|verify} messages.
         * @param message CriarIngredienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarIngredienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarIngredienteRequest message, length delimited. Does not implicitly {@link chickie.CriarIngredienteRequest.verify|verify} messages.
         * @param message CriarIngredienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarIngredienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarIngredienteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarIngredienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarIngredienteRequest;

        /**
         * Decodes a CriarIngredienteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarIngredienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarIngredienteRequest;

        /**
         * Verifies a CriarIngredienteRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarIngredienteRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarIngredienteRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarIngredienteRequest;

        /**
         * Creates a plain object from a CriarIngredienteRequest message. Also converts values to other types if specified.
         * @param message CriarIngredienteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarIngredienteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarIngredienteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarIngredienteRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarIngredienteRequest. */
    interface IAtualizarIngredienteRequest {

        /** AtualizarIngredienteRequest nome */
        nome?: (string|null);

        /** AtualizarIngredienteRequest unidade_medida */
        unidade_medida?: (string|null);

        /** AtualizarIngredienteRequest quantidade */
        quantidade?: (string|null);

        /** AtualizarIngredienteRequest preco_unitario */
        preco_unitario?: (number|null);
    }

    /** Represents an AtualizarIngredienteRequest. */
    class AtualizarIngredienteRequest implements IAtualizarIngredienteRequest {

        /**
         * Constructs a new AtualizarIngredienteRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarIngredienteRequest);

        /** AtualizarIngredienteRequest nome. */
        public nome: string;

        /** AtualizarIngredienteRequest unidade_medida. */
        public unidade_medida: string;

        /** AtualizarIngredienteRequest quantidade. */
        public quantidade: string;

        /** AtualizarIngredienteRequest preco_unitario. */
        public preco_unitario: number;

        /**
         * Creates a new AtualizarIngredienteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarIngredienteRequest instance
         */
        public static create(properties?: chickie.IAtualizarIngredienteRequest): chickie.AtualizarIngredienteRequest;

        /**
         * Encodes the specified AtualizarIngredienteRequest message. Does not implicitly {@link chickie.AtualizarIngredienteRequest.verify|verify} messages.
         * @param message AtualizarIngredienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarIngredienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarIngredienteRequest message, length delimited. Does not implicitly {@link chickie.AtualizarIngredienteRequest.verify|verify} messages.
         * @param message AtualizarIngredienteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarIngredienteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarIngredienteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarIngredienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarIngredienteRequest;

        /**
         * Decodes an AtualizarIngredienteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarIngredienteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarIngredienteRequest;

        /**
         * Verifies an AtualizarIngredienteRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarIngredienteRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarIngredienteRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarIngredienteRequest;

        /**
         * Creates a plain object from an AtualizarIngredienteRequest message. Also converts values to other types if specified.
         * @param message AtualizarIngredienteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarIngredienteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarIngredienteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarIngredienteRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AvaliarLojaRequest. */
    interface IAvaliarLojaRequest {

        /** AvaliarLojaRequest nota */
        nota?: (number|null);

        /** AvaliarLojaRequest comentario */
        comentario?: (string|null);
    }

    /** Represents an AvaliarLojaRequest. */
    class AvaliarLojaRequest implements IAvaliarLojaRequest {

        /**
         * Constructs a new AvaliarLojaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAvaliarLojaRequest);

        /** AvaliarLojaRequest nota. */
        public nota: number;

        /** AvaliarLojaRequest comentario. */
        public comentario: string;

        /**
         * Creates a new AvaliarLojaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AvaliarLojaRequest instance
         */
        public static create(properties?: chickie.IAvaliarLojaRequest): chickie.AvaliarLojaRequest;

        /**
         * Encodes the specified AvaliarLojaRequest message. Does not implicitly {@link chickie.AvaliarLojaRequest.verify|verify} messages.
         * @param message AvaliarLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAvaliarLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AvaliarLojaRequest message, length delimited. Does not implicitly {@link chickie.AvaliarLojaRequest.verify|verify} messages.
         * @param message AvaliarLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAvaliarLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AvaliarLojaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AvaliarLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AvaliarLojaRequest;

        /**
         * Decodes an AvaliarLojaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AvaliarLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AvaliarLojaRequest;

        /**
         * Verifies an AvaliarLojaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AvaliarLojaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AvaliarLojaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AvaliarLojaRequest;

        /**
         * Creates a plain object from an AvaliarLojaRequest message. Also converts values to other types if specified.
         * @param message AvaliarLojaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AvaliarLojaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AvaliarLojaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AvaliarLojaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AvaliarProdutoRequest. */
    interface IAvaliarProdutoRequest {

        /** AvaliarProdutoRequest produto_uuid */
        produto_uuid?: (string|null);

        /** AvaliarProdutoRequest nota */
        nota?: (number|null);

        /** AvaliarProdutoRequest descricao */
        descricao?: (string|null);

        /** AvaliarProdutoRequest comentario */
        comentario?: (string|null);
    }

    /** Represents an AvaliarProdutoRequest. */
    class AvaliarProdutoRequest implements IAvaliarProdutoRequest {

        /**
         * Constructs a new AvaliarProdutoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAvaliarProdutoRequest);

        /** AvaliarProdutoRequest produto_uuid. */
        public produto_uuid: string;

        /** AvaliarProdutoRequest nota. */
        public nota: number;

        /** AvaliarProdutoRequest descricao. */
        public descricao: string;

        /** AvaliarProdutoRequest comentario. */
        public comentario: string;

        /**
         * Creates a new AvaliarProdutoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AvaliarProdutoRequest instance
         */
        public static create(properties?: chickie.IAvaliarProdutoRequest): chickie.AvaliarProdutoRequest;

        /**
         * Encodes the specified AvaliarProdutoRequest message. Does not implicitly {@link chickie.AvaliarProdutoRequest.verify|verify} messages.
         * @param message AvaliarProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAvaliarProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AvaliarProdutoRequest message, length delimited. Does not implicitly {@link chickie.AvaliarProdutoRequest.verify|verify} messages.
         * @param message AvaliarProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAvaliarProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AvaliarProdutoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AvaliarProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AvaliarProdutoRequest;

        /**
         * Decodes an AvaliarProdutoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AvaliarProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AvaliarProdutoRequest;

        /**
         * Verifies an AvaliarProdutoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AvaliarProdutoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AvaliarProdutoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AvaliarProdutoRequest;

        /**
         * Creates a plain object from an AvaliarProdutoRequest message. Also converts values to other types if specified.
         * @param message AvaliarProdutoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AvaliarProdutoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AvaliarProdutoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AvaliarProdutoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarAvaliacaoLojaRequest. */
    interface IAtualizarAvaliacaoLojaRequest {

        /** AtualizarAvaliacaoLojaRequest nota */
        nota?: (number|null);

        /** AtualizarAvaliacaoLojaRequest comentario */
        comentario?: (string|null);
    }

    /** Represents an AtualizarAvaliacaoLojaRequest. */
    class AtualizarAvaliacaoLojaRequest implements IAtualizarAvaliacaoLojaRequest {

        /**
         * Constructs a new AtualizarAvaliacaoLojaRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarAvaliacaoLojaRequest);

        /** AtualizarAvaliacaoLojaRequest nota. */
        public nota: number;

        /** AtualizarAvaliacaoLojaRequest comentario. */
        public comentario: string;

        /**
         * Creates a new AtualizarAvaliacaoLojaRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarAvaliacaoLojaRequest instance
         */
        public static create(properties?: chickie.IAtualizarAvaliacaoLojaRequest): chickie.AtualizarAvaliacaoLojaRequest;

        /**
         * Encodes the specified AtualizarAvaliacaoLojaRequest message. Does not implicitly {@link chickie.AtualizarAvaliacaoLojaRequest.verify|verify} messages.
         * @param message AtualizarAvaliacaoLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarAvaliacaoLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarAvaliacaoLojaRequest message, length delimited. Does not implicitly {@link chickie.AtualizarAvaliacaoLojaRequest.verify|verify} messages.
         * @param message AtualizarAvaliacaoLojaRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarAvaliacaoLojaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarAvaliacaoLojaRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarAvaliacaoLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarAvaliacaoLojaRequest;

        /**
         * Decodes an AtualizarAvaliacaoLojaRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarAvaliacaoLojaRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarAvaliacaoLojaRequest;

        /**
         * Verifies an AtualizarAvaliacaoLojaRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarAvaliacaoLojaRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarAvaliacaoLojaRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarAvaliacaoLojaRequest;

        /**
         * Creates a plain object from an AtualizarAvaliacaoLojaRequest message. Also converts values to other types if specified.
         * @param message AtualizarAvaliacaoLojaRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarAvaliacaoLojaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarAvaliacaoLojaRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarAvaliacaoLojaRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarAvaliacaoProdutoRequest. */
    interface IAtualizarAvaliacaoProdutoRequest {

        /** AtualizarAvaliacaoProdutoRequest nota */
        nota?: (number|null);

        /** AtualizarAvaliacaoProdutoRequest descricao */
        descricao?: (string|null);

        /** AtualizarAvaliacaoProdutoRequest comentario */
        comentario?: (string|null);
    }

    /** Represents an AtualizarAvaliacaoProdutoRequest. */
    class AtualizarAvaliacaoProdutoRequest implements IAtualizarAvaliacaoProdutoRequest {

        /**
         * Constructs a new AtualizarAvaliacaoProdutoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarAvaliacaoProdutoRequest);

        /** AtualizarAvaliacaoProdutoRequest nota. */
        public nota: number;

        /** AtualizarAvaliacaoProdutoRequest descricao. */
        public descricao: string;

        /** AtualizarAvaliacaoProdutoRequest comentario. */
        public comentario: string;

        /**
         * Creates a new AtualizarAvaliacaoProdutoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarAvaliacaoProdutoRequest instance
         */
        public static create(properties?: chickie.IAtualizarAvaliacaoProdutoRequest): chickie.AtualizarAvaliacaoProdutoRequest;

        /**
         * Encodes the specified AtualizarAvaliacaoProdutoRequest message. Does not implicitly {@link chickie.AtualizarAvaliacaoProdutoRequest.verify|verify} messages.
         * @param message AtualizarAvaliacaoProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarAvaliacaoProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarAvaliacaoProdutoRequest message, length delimited. Does not implicitly {@link chickie.AtualizarAvaliacaoProdutoRequest.verify|verify} messages.
         * @param message AtualizarAvaliacaoProdutoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarAvaliacaoProdutoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarAvaliacaoProdutoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarAvaliacaoProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarAvaliacaoProdutoRequest;

        /**
         * Decodes an AtualizarAvaliacaoProdutoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarAvaliacaoProdutoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarAvaliacaoProdutoRequest;

        /**
         * Verifies an AtualizarAvaliacaoProdutoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarAvaliacaoProdutoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarAvaliacaoProdutoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarAvaliacaoProdutoRequest;

        /**
         * Creates a plain object from an AtualizarAvaliacaoProdutoRequest message. Also converts values to other types if specified.
         * @param message AtualizarAvaliacaoProdutoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarAvaliacaoProdutoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarAvaliacaoProdutoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarAvaliacaoProdutoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarPromocaoRequest. */
    interface ICriarPromocaoRequest {

        /** CriarPromocaoRequest nome */
        nome?: (string|null);

        /** CriarPromocaoRequest descricao */
        descricao?: (string|null);

        /** CriarPromocaoRequest tipo_desconto */
        tipo_desconto?: (string|null);

        /** CriarPromocaoRequest valor_desconto */
        valor_desconto?: (number|null);

        /** CriarPromocaoRequest valor_minimo */
        valor_minimo?: (number|null);

        /** CriarPromocaoRequest data_inicio */
        data_inicio?: (string|null);

        /** CriarPromocaoRequest data_fim */
        data_fim?: (string|null);

        /** CriarPromocaoRequest dias_semana_validos */
        dias_semana_validos?: (number[]|null);

        /** CriarPromocaoRequest tipo_escopo */
        tipo_escopo?: (string|null);

        /** CriarPromocaoRequest produto_uuid */
        produto_uuid?: (string|null);

        /** CriarPromocaoRequest categoria_uuid */
        categoria_uuid?: (string|null);

        /** CriarPromocaoRequest prioridade */
        prioridade?: (number|null);
    }

    /** Represents a CriarPromocaoRequest. */
    class CriarPromocaoRequest implements ICriarPromocaoRequest {

        /**
         * Constructs a new CriarPromocaoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarPromocaoRequest);

        /** CriarPromocaoRequest nome. */
        public nome: string;

        /** CriarPromocaoRequest descricao. */
        public descricao: string;

        /** CriarPromocaoRequest tipo_desconto. */
        public tipo_desconto: string;

        /** CriarPromocaoRequest valor_desconto. */
        public valor_desconto: number;

        /** CriarPromocaoRequest valor_minimo. */
        public valor_minimo: number;

        /** CriarPromocaoRequest data_inicio. */
        public data_inicio: string;

        /** CriarPromocaoRequest data_fim. */
        public data_fim: string;

        /** CriarPromocaoRequest dias_semana_validos. */
        public dias_semana_validos: number[];

        /** CriarPromocaoRequest tipo_escopo. */
        public tipo_escopo: string;

        /** CriarPromocaoRequest produto_uuid. */
        public produto_uuid: string;

        /** CriarPromocaoRequest categoria_uuid. */
        public categoria_uuid: string;

        /** CriarPromocaoRequest prioridade. */
        public prioridade: number;

        /**
         * Creates a new CriarPromocaoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarPromocaoRequest instance
         */
        public static create(properties?: chickie.ICriarPromocaoRequest): chickie.CriarPromocaoRequest;

        /**
         * Encodes the specified CriarPromocaoRequest message. Does not implicitly {@link chickie.CriarPromocaoRequest.verify|verify} messages.
         * @param message CriarPromocaoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarPromocaoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarPromocaoRequest message, length delimited. Does not implicitly {@link chickie.CriarPromocaoRequest.verify|verify} messages.
         * @param message CriarPromocaoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarPromocaoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarPromocaoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarPromocaoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarPromocaoRequest;

        /**
         * Decodes a CriarPromocaoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarPromocaoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarPromocaoRequest;

        /**
         * Verifies a CriarPromocaoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarPromocaoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarPromocaoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarPromocaoRequest;

        /**
         * Creates a plain object from a CriarPromocaoRequest message. Also converts values to other types if specified.
         * @param message CriarPromocaoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarPromocaoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarPromocaoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarPromocaoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarPromocaoRequest. */
    interface IAtualizarPromocaoRequest {

        /** AtualizarPromocaoRequest nome */
        nome?: (string|null);

        /** AtualizarPromocaoRequest descricao */
        descricao?: (string|null);

        /** AtualizarPromocaoRequest tipo_desconto */
        tipo_desconto?: (string|null);

        /** AtualizarPromocaoRequest valor_desconto */
        valor_desconto?: (number|null);

        /** AtualizarPromocaoRequest valor_minimo */
        valor_minimo?: (number|null);

        /** AtualizarPromocaoRequest data_inicio */
        data_inicio?: (string|null);

        /** AtualizarPromocaoRequest data_fim */
        data_fim?: (string|null);

        /** AtualizarPromocaoRequest dias_semana_validos */
        dias_semana_validos?: (number[]|null);

        /** AtualizarPromocaoRequest tipo_escopo */
        tipo_escopo?: (string|null);

        /** AtualizarPromocaoRequest produto_uuid */
        produto_uuid?: (string|null);

        /** AtualizarPromocaoRequest categoria_uuid */
        categoria_uuid?: (string|null);

        /** AtualizarPromocaoRequest prioridade */
        prioridade?: (number|null);
    }

    /** Represents an AtualizarPromocaoRequest. */
    class AtualizarPromocaoRequest implements IAtualizarPromocaoRequest {

        /**
         * Constructs a new AtualizarPromocaoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarPromocaoRequest);

        /** AtualizarPromocaoRequest nome. */
        public nome: string;

        /** AtualizarPromocaoRequest descricao. */
        public descricao: string;

        /** AtualizarPromocaoRequest tipo_desconto. */
        public tipo_desconto: string;

        /** AtualizarPromocaoRequest valor_desconto. */
        public valor_desconto: number;

        /** AtualizarPromocaoRequest valor_minimo. */
        public valor_minimo: number;

        /** AtualizarPromocaoRequest data_inicio. */
        public data_inicio: string;

        /** AtualizarPromocaoRequest data_fim. */
        public data_fim: string;

        /** AtualizarPromocaoRequest dias_semana_validos. */
        public dias_semana_validos: number[];

        /** AtualizarPromocaoRequest tipo_escopo. */
        public tipo_escopo: string;

        /** AtualizarPromocaoRequest produto_uuid. */
        public produto_uuid: string;

        /** AtualizarPromocaoRequest categoria_uuid. */
        public categoria_uuid: string;

        /** AtualizarPromocaoRequest prioridade. */
        public prioridade: number;

        /**
         * Creates a new AtualizarPromocaoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarPromocaoRequest instance
         */
        public static create(properties?: chickie.IAtualizarPromocaoRequest): chickie.AtualizarPromocaoRequest;

        /**
         * Encodes the specified AtualizarPromocaoRequest message. Does not implicitly {@link chickie.AtualizarPromocaoRequest.verify|verify} messages.
         * @param message AtualizarPromocaoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarPromocaoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarPromocaoRequest message, length delimited. Does not implicitly {@link chickie.AtualizarPromocaoRequest.verify|verify} messages.
         * @param message AtualizarPromocaoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarPromocaoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarPromocaoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarPromocaoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarPromocaoRequest;

        /**
         * Decodes an AtualizarPromocaoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarPromocaoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarPromocaoRequest;

        /**
         * Verifies an AtualizarPromocaoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarPromocaoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarPromocaoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarPromocaoRequest;

        /**
         * Creates a plain object from an AtualizarPromocaoRequest message. Also converts values to other types if specified.
         * @param message AtualizarPromocaoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarPromocaoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarPromocaoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarPromocaoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtualizarStatusPedidoRequest. */
    interface IAtualizarStatusPedidoRequest {

        /** AtualizarStatusPedidoRequest novo_status */
        novo_status?: (string|null);
    }

    /** Represents an AtualizarStatusPedidoRequest. */
    class AtualizarStatusPedidoRequest implements IAtualizarStatusPedidoRequest {

        /**
         * Constructs a new AtualizarStatusPedidoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtualizarStatusPedidoRequest);

        /** AtualizarStatusPedidoRequest novo_status. */
        public novo_status: string;

        /**
         * Creates a new AtualizarStatusPedidoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtualizarStatusPedidoRequest instance
         */
        public static create(properties?: chickie.IAtualizarStatusPedidoRequest): chickie.AtualizarStatusPedidoRequest;

        /**
         * Encodes the specified AtualizarStatusPedidoRequest message. Does not implicitly {@link chickie.AtualizarStatusPedidoRequest.verify|verify} messages.
         * @param message AtualizarStatusPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtualizarStatusPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtualizarStatusPedidoRequest message, length delimited. Does not implicitly {@link chickie.AtualizarStatusPedidoRequest.verify|verify} messages.
         * @param message AtualizarStatusPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtualizarStatusPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtualizarStatusPedidoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtualizarStatusPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtualizarStatusPedidoRequest;

        /**
         * Decodes an AtualizarStatusPedidoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtualizarStatusPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtualizarStatusPedidoRequest;

        /**
         * Verifies an AtualizarStatusPedidoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtualizarStatusPedidoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtualizarStatusPedidoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtualizarStatusPedidoRequest;

        /**
         * Creates a plain object from an AtualizarStatusPedidoRequest message. Also converts values to other types if specified.
         * @param message AtualizarStatusPedidoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtualizarStatusPedidoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtualizarStatusPedidoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtualizarStatusPedidoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AtribuirEntregadorRequest. */
    interface IAtribuirEntregadorRequest {

        /** AtribuirEntregadorRequest entregador_uuid */
        entregador_uuid?: (string|null);
    }

    /** Represents an AtribuirEntregadorRequest. */
    class AtribuirEntregadorRequest implements IAtribuirEntregadorRequest {

        /**
         * Constructs a new AtribuirEntregadorRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAtribuirEntregadorRequest);

        /** AtribuirEntregadorRequest entregador_uuid. */
        public entregador_uuid: string;

        /**
         * Creates a new AtribuirEntregadorRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AtribuirEntregadorRequest instance
         */
        public static create(properties?: chickie.IAtribuirEntregadorRequest): chickie.AtribuirEntregadorRequest;

        /**
         * Encodes the specified AtribuirEntregadorRequest message. Does not implicitly {@link chickie.AtribuirEntregadorRequest.verify|verify} messages.
         * @param message AtribuirEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAtribuirEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AtribuirEntregadorRequest message, length delimited. Does not implicitly {@link chickie.AtribuirEntregadorRequest.verify|verify} messages.
         * @param message AtribuirEntregadorRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAtribuirEntregadorRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AtribuirEntregadorRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AtribuirEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AtribuirEntregadorRequest;

        /**
         * Decodes an AtribuirEntregadorRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AtribuirEntregadorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AtribuirEntregadorRequest;

        /**
         * Verifies an AtribuirEntregadorRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AtribuirEntregadorRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AtribuirEntregadorRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.AtribuirEntregadorRequest;

        /**
         * Creates a plain object from an AtribuirEntregadorRequest message. Also converts values to other types if specified.
         * @param message AtribuirEntregadorRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AtribuirEntregadorRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AtribuirEntregadorRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AtribuirEntregadorRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ParteItemRequest. */
    interface IParteItemRequest {

        /** ParteItemRequest produto_uuid */
        produto_uuid?: (string|null);

        /** ParteItemRequest posicao */
        posicao?: (number|null);
    }

    /** Represents a ParteItemRequest. */
    class ParteItemRequest implements IParteItemRequest {

        /**
         * Constructs a new ParteItemRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IParteItemRequest);

        /** ParteItemRequest produto_uuid. */
        public produto_uuid: string;

        /** ParteItemRequest posicao. */
        public posicao: number;

        /**
         * Creates a new ParteItemRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ParteItemRequest instance
         */
        public static create(properties?: chickie.IParteItemRequest): chickie.ParteItemRequest;

        /**
         * Encodes the specified ParteItemRequest message. Does not implicitly {@link chickie.ParteItemRequest.verify|verify} messages.
         * @param message ParteItemRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IParteItemRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ParteItemRequest message, length delimited. Does not implicitly {@link chickie.ParteItemRequest.verify|verify} messages.
         * @param message ParteItemRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IParteItemRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ParteItemRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ParteItemRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ParteItemRequest;

        /**
         * Decodes a ParteItemRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ParteItemRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ParteItemRequest;

        /**
         * Verifies a ParteItemRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ParteItemRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ParteItemRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.ParteItemRequest;

        /**
         * Creates a plain object from a ParteItemRequest message. Also converts values to other types if specified.
         * @param message ParteItemRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ParteItemRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ParteItemRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ParteItemRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ItemPedidoRequest. */
    interface IItemPedidoRequest {

        /** ItemPedidoRequest quantidade */
        quantidade?: (number|null);

        /** ItemPedidoRequest observacoes */
        observacoes?: (string|null);

        /** ItemPedidoRequest partes */
        partes?: (chickie.IParteItemRequest[]|null);
    }

    /** Represents an ItemPedidoRequest. */
    class ItemPedidoRequest implements IItemPedidoRequest {

        /**
         * Constructs a new ItemPedidoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IItemPedidoRequest);

        /** ItemPedidoRequest quantidade. */
        public quantidade: number;

        /** ItemPedidoRequest observacoes. */
        public observacoes: string;

        /** ItemPedidoRequest partes. */
        public partes: chickie.IParteItemRequest[];

        /**
         * Creates a new ItemPedidoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemPedidoRequest instance
         */
        public static create(properties?: chickie.IItemPedidoRequest): chickie.ItemPedidoRequest;

        /**
         * Encodes the specified ItemPedidoRequest message. Does not implicitly {@link chickie.ItemPedidoRequest.verify|verify} messages.
         * @param message ItemPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IItemPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemPedidoRequest message, length delimited. Does not implicitly {@link chickie.ItemPedidoRequest.verify|verify} messages.
         * @param message ItemPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IItemPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemPedidoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ItemPedidoRequest;

        /**
         * Decodes an ItemPedidoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ItemPedidoRequest;

        /**
         * Verifies an ItemPedidoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemPedidoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemPedidoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.ItemPedidoRequest;

        /**
         * Creates a plain object from an ItemPedidoRequest message. Also converts values to other types if specified.
         * @param message ItemPedidoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ItemPedidoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemPedidoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemPedidoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CriarPedidoRequest. */
    interface ICriarPedidoRequest {

        /** CriarPedidoRequest loja_uuid */
        loja_uuid?: (string|null);

        /** CriarPedidoRequest taxa_entrega */
        taxa_entrega?: (number|null);

        /** CriarPedidoRequest forma_pagamento */
        forma_pagamento?: (string|null);

        /** CriarPedidoRequest observacoes */
        observacoes?: (string|null);

        /** CriarPedidoRequest codigo_cupom */
        codigo_cupom?: (string|null);

        /** CriarPedidoRequest itens */
        itens?: (chickie.IItemPedidoRequest[]|null);

        /** CriarPedidoRequest endereco_entrega */
        endereco_entrega?: (chickie.IEnderecoRequest|null);
    }

    /** Represents a CriarPedidoRequest. */
    class CriarPedidoRequest implements ICriarPedidoRequest {

        /**
         * Constructs a new CriarPedidoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICriarPedidoRequest);

        /** CriarPedidoRequest loja_uuid. */
        public loja_uuid: string;

        /** CriarPedidoRequest taxa_entrega. */
        public taxa_entrega: number;

        /** CriarPedidoRequest forma_pagamento. */
        public forma_pagamento: string;

        /** CriarPedidoRequest observacoes. */
        public observacoes: string;

        /** CriarPedidoRequest codigo_cupom. */
        public codigo_cupom: string;

        /** CriarPedidoRequest itens. */
        public itens: chickie.IItemPedidoRequest[];

        /** CriarPedidoRequest endereco_entrega. */
        public endereco_entrega?: (chickie.IEnderecoRequest|null);

        /**
         * Creates a new CriarPedidoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CriarPedidoRequest instance
         */
        public static create(properties?: chickie.ICriarPedidoRequest): chickie.CriarPedidoRequest;

        /**
         * Encodes the specified CriarPedidoRequest message. Does not implicitly {@link chickie.CriarPedidoRequest.verify|verify} messages.
         * @param message CriarPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICriarPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CriarPedidoRequest message, length delimited. Does not implicitly {@link chickie.CriarPedidoRequest.verify|verify} messages.
         * @param message CriarPedidoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICriarPedidoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CriarPedidoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CriarPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.CriarPedidoRequest;

        /**
         * Decodes a CriarPedidoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CriarPedidoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.CriarPedidoRequest;

        /**
         * Verifies a CriarPedidoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CriarPedidoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CriarPedidoRequest
         */
        public static fromObject(object: { [k: string]: any }): chickie.CriarPedidoRequest;

        /**
         * Creates a plain object from a CriarPedidoRequest message. Also converts values to other types if specified.
         * @param message CriarPedidoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.CriarPedidoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CriarPedidoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CriarPedidoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Usuario. */
    interface IUsuario {

        /** Usuario nome */
        nome?: (string|null);

        /** Usuario username */
        username?: (string|null);

        /** Usuario email */
        email?: (string|null);

        /** Usuario celular */
        celular?: (string|null);

        /** Usuario criado_em */
        criado_em?: (string|null);

        /** Usuario atualizado_em */
        atualizado_em?: (string|null);

        /** Usuario modo_de_cadastro */
        modo_de_cadastro?: (string|null);

        /** Usuario classe */
        classe?: (string|null);

        /** Usuario uuid */
        uuid?: (string|null);

        /** Usuario ativo */
        ativo?: (boolean|null);

        /** Usuario passou_pelo_primeiro_acesso */
        passou_pelo_primeiro_acesso?: (boolean|null);

        /** Usuario bloqueado */
        bloqueado?: (boolean|null);
    }

    /** Represents a Usuario. */
    class Usuario implements IUsuario {

        /**
         * Constructs a new Usuario.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IUsuario);

        /** Usuario nome. */
        public nome: string;

        /** Usuario username. */
        public username: string;

        /** Usuario email. */
        public email: string;

        /** Usuario celular. */
        public celular: string;

        /** Usuario criado_em. */
        public criado_em: string;

        /** Usuario atualizado_em. */
        public atualizado_em: string;

        /** Usuario modo_de_cadastro. */
        public modo_de_cadastro: string;

        /** Usuario classe. */
        public classe: string;

        /** Usuario uuid. */
        public uuid: string;

        /** Usuario ativo. */
        public ativo: boolean;

        /** Usuario passou_pelo_primeiro_acesso. */
        public passou_pelo_primeiro_acesso: boolean;

        /** Usuario bloqueado. */
        public bloqueado: boolean;

        /**
         * Creates a new Usuario instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Usuario instance
         */
        public static create(properties?: chickie.IUsuario): chickie.Usuario;

        /**
         * Encodes the specified Usuario message. Does not implicitly {@link chickie.Usuario.verify|verify} messages.
         * @param message Usuario message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IUsuario, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Usuario message, length delimited. Does not implicitly {@link chickie.Usuario.verify|verify} messages.
         * @param message Usuario message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IUsuario, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Usuario message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Usuario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Usuario;

        /**
         * Decodes a Usuario message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Usuario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Usuario;

        /**
         * Verifies a Usuario message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Usuario message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Usuario
         */
        public static fromObject(object: { [k: string]: any }): chickie.Usuario;

        /**
         * Creates a plain object from a Usuario message. Also converts values to other types if specified.
         * @param message Usuario
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Usuario, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Usuario to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Usuario
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarUsuariosResponse. */
    interface IListarUsuariosResponse {

        /** ListarUsuariosResponse usuarios */
        usuarios?: (chickie.IUsuario[]|null);
    }

    /** Represents a ListarUsuariosResponse. */
    class ListarUsuariosResponse implements IListarUsuariosResponse {

        /**
         * Constructs a new ListarUsuariosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarUsuariosResponse);

        /** ListarUsuariosResponse usuarios. */
        public usuarios: chickie.IUsuario[];

        /**
         * Creates a new ListarUsuariosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarUsuariosResponse instance
         */
        public static create(properties?: chickie.IListarUsuariosResponse): chickie.ListarUsuariosResponse;

        /**
         * Encodes the specified ListarUsuariosResponse message. Does not implicitly {@link chickie.ListarUsuariosResponse.verify|verify} messages.
         * @param message ListarUsuariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarUsuariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarUsuariosResponse message, length delimited. Does not implicitly {@link chickie.ListarUsuariosResponse.verify|verify} messages.
         * @param message ListarUsuariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarUsuariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarUsuariosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarUsuariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarUsuariosResponse;

        /**
         * Decodes a ListarUsuariosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarUsuariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarUsuariosResponse;

        /**
         * Verifies a ListarUsuariosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarUsuariosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarUsuariosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarUsuariosResponse;

        /**
         * Creates a plain object from a ListarUsuariosResponse message. Also converts values to other types if specified.
         * @param message ListarUsuariosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarUsuariosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarUsuariosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarUsuariosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Loja. */
    interface ILoja {

        /** Loja uuid */
        uuid?: (string|null);

        /** Loja nome */
        nome?: (string|null);

        /** Loja slug */
        slug?: (string|null);

        /** Loja descricao */
        descricao?: (string|null);

        /** Loja email */
        email?: (string|null);

        /** Loja celular */
        celular?: (string|null);

        /** Loja ativa */
        ativa?: (boolean|null);

        /** Loja logo_url */
        logo_url?: (string|null);

        /** Loja banner_url */
        banner_url?: (string|null);

        /** Loja bloqueado */
        bloqueado?: (boolean|null);

        /** Loja horario_abertura */
        horario_abertura?: (string|null);

        /** Loja horario_fechamento */
        horario_fechamento?: (string|null);

        /** Loja dias_funcionamento */
        dias_funcionamento?: (string|null);

        /** Loja tempo_preparo_min */
        tempo_preparo_min?: (number|null);

        /** Loja taxa_entrega */
        taxa_entrega?: (number|null);

        /** Loja valor_minimo_pedido */
        valor_minimo_pedido?: (number|null);

        /** Loja raio_entrega_km */
        raio_entrega_km?: (number|null);

        /** Loja criado_em */
        criado_em?: (string|null);

        /** Loja atualizado_em */
        atualizado_em?: (string|null);
    }

    /** Represents a Loja. */
    class Loja implements ILoja {

        /**
         * Constructs a new Loja.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ILoja);

        /** Loja uuid. */
        public uuid: string;

        /** Loja nome. */
        public nome: string;

        /** Loja slug. */
        public slug: string;

        /** Loja descricao. */
        public descricao: string;

        /** Loja email. */
        public email: string;

        /** Loja celular. */
        public celular: string;

        /** Loja ativa. */
        public ativa: boolean;

        /** Loja logo_url. */
        public logo_url: string;

        /** Loja banner_url. */
        public banner_url: string;

        /** Loja bloqueado. */
        public bloqueado: boolean;

        /** Loja horario_abertura. */
        public horario_abertura: string;

        /** Loja horario_fechamento. */
        public horario_fechamento: string;

        /** Loja dias_funcionamento. */
        public dias_funcionamento: string;

        /** Loja tempo_preparo_min. */
        public tempo_preparo_min: number;

        /** Loja taxa_entrega. */
        public taxa_entrega: number;

        /** Loja valor_minimo_pedido. */
        public valor_minimo_pedido: number;

        /** Loja raio_entrega_km. */
        public raio_entrega_km: number;

        /** Loja criado_em. */
        public criado_em: string;

        /** Loja atualizado_em. */
        public atualizado_em: string;

        /**
         * Creates a new Loja instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Loja instance
         */
        public static create(properties?: chickie.ILoja): chickie.Loja;

        /**
         * Encodes the specified Loja message. Does not implicitly {@link chickie.Loja.verify|verify} messages.
         * @param message Loja message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ILoja, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Loja message, length delimited. Does not implicitly {@link chickie.Loja.verify|verify} messages.
         * @param message Loja message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ILoja, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Loja message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Loja
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Loja;

        /**
         * Decodes a Loja message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Loja
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Loja;

        /**
         * Verifies a Loja message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Loja message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Loja
         */
        public static fromObject(object: { [k: string]: any }): chickie.Loja;

        /**
         * Creates a plain object from a Loja message. Also converts values to other types if specified.
         * @param message Loja
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Loja, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Loja to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Loja
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarLojasResponse. */
    interface IListarLojasResponse {

        /** ListarLojasResponse lojas */
        lojas?: (chickie.ILoja[]|null);
    }

    /** Represents a ListarLojasResponse. */
    class ListarLojasResponse implements IListarLojasResponse {

        /**
         * Constructs a new ListarLojasResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarLojasResponse);

        /** ListarLojasResponse lojas. */
        public lojas: chickie.ILoja[];

        /**
         * Creates a new ListarLojasResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarLojasResponse instance
         */
        public static create(properties?: chickie.IListarLojasResponse): chickie.ListarLojasResponse;

        /**
         * Encodes the specified ListarLojasResponse message. Does not implicitly {@link chickie.ListarLojasResponse.verify|verify} messages.
         * @param message ListarLojasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarLojasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarLojasResponse message, length delimited. Does not implicitly {@link chickie.ListarLojasResponse.verify|verify} messages.
         * @param message ListarLojasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarLojasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarLojasResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarLojasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarLojasResponse;

        /**
         * Decodes a ListarLojasResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarLojasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarLojasResponse;

        /**
         * Verifies a ListarLojasResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarLojasResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarLojasResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarLojasResponse;

        /**
         * Creates a plain object from a ListarLojasResponse message. Also converts values to other types if specified.
         * @param message ListarLojasResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarLojasResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarLojasResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarLojasResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Produto. */
    interface IProduto {

        /** Produto uuid */
        uuid?: (string|null);

        /** Produto nome */
        nome?: (string|null);

        /** Produto preco */
        preco?: (number|null);

        /** Produto descricao */
        descricao?: (string|null);

        /** Produto disponivel */
        disponivel?: (boolean|null);

        /** Produto categoria_uuid */
        categoria_uuid?: (string|null);

        /** Produto loja_uuid */
        loja_uuid?: (string|null);

        /** Produto imagem_url */
        imagem_url?: (string|null);

        /** Produto tempo_preparo_min */
        tempo_preparo_min?: (number|null);

        /** Produto destaque */
        destaque?: (boolean|null);

        /** Produto criado_em */
        criado_em?: (string|null);

        /** Produto atualizado_em */
        atualizado_em?: (string|null);
    }

    /** Represents a Produto. */
    class Produto implements IProduto {

        /**
         * Constructs a new Produto.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IProduto);

        /** Produto uuid. */
        public uuid: string;

        /** Produto nome. */
        public nome: string;

        /** Produto preco. */
        public preco: number;

        /** Produto descricao. */
        public descricao: string;

        /** Produto disponivel. */
        public disponivel: boolean;

        /** Produto categoria_uuid. */
        public categoria_uuid: string;

        /** Produto loja_uuid. */
        public loja_uuid: string;

        /** Produto imagem_url. */
        public imagem_url: string;

        /** Produto tempo_preparo_min. */
        public tempo_preparo_min: number;

        /** Produto destaque. */
        public destaque: boolean;

        /** Produto criado_em. */
        public criado_em: string;

        /** Produto atualizado_em. */
        public atualizado_em: string;

        /**
         * Creates a new Produto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Produto instance
         */
        public static create(properties?: chickie.IProduto): chickie.Produto;

        /**
         * Encodes the specified Produto message. Does not implicitly {@link chickie.Produto.verify|verify} messages.
         * @param message Produto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IProduto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Produto message, length delimited. Does not implicitly {@link chickie.Produto.verify|verify} messages.
         * @param message Produto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IProduto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Produto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Produto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Produto;

        /**
         * Decodes a Produto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Produto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Produto;

        /**
         * Verifies a Produto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Produto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Produto
         */
        public static fromObject(object: { [k: string]: any }): chickie.Produto;

        /**
         * Creates a plain object from a Produto message. Also converts values to other types if specified.
         * @param message Produto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Produto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Produto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Produto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarProdutosResponse. */
    interface IListarProdutosResponse {

        /** ListarProdutosResponse produtos */
        produtos?: (chickie.IProduto[]|null);
    }

    /** Represents a ListarProdutosResponse. */
    class ListarProdutosResponse implements IListarProdutosResponse {

        /**
         * Constructs a new ListarProdutosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarProdutosResponse);

        /** ListarProdutosResponse produtos. */
        public produtos: chickie.IProduto[];

        /**
         * Creates a new ListarProdutosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarProdutosResponse instance
         */
        public static create(properties?: chickie.IListarProdutosResponse): chickie.ListarProdutosResponse;

        /**
         * Encodes the specified ListarProdutosResponse message. Does not implicitly {@link chickie.ListarProdutosResponse.verify|verify} messages.
         * @param message ListarProdutosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarProdutosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarProdutosResponse message, length delimited. Does not implicitly {@link chickie.ListarProdutosResponse.verify|verify} messages.
         * @param message ListarProdutosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarProdutosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarProdutosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarProdutosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarProdutosResponse;

        /**
         * Decodes a ListarProdutosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarProdutosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarProdutosResponse;

        /**
         * Verifies a ListarProdutosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarProdutosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarProdutosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarProdutosResponse;

        /**
         * Creates a plain object from a ListarProdutosResponse message. Also converts values to other types if specified.
         * @param message ListarProdutosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarProdutosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarProdutosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarProdutosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Categoria. */
    interface ICategoria {

        /** Categoria uuid */
        uuid?: (string|null);

        /** Categoria nome */
        nome?: (string|null);

        /** Categoria loja_uuid */
        loja_uuid?: (string|null);

        /** Categoria ordem */
        ordem?: (number|null);

        /** Categoria pizza_mode */
        pizza_mode?: (boolean|null);

        /** Categoria descricao */
        descricao?: (string|null);

        /** Categoria criado_em */
        criado_em?: (string|null);
    }

    /** Represents a Categoria. */
    class Categoria implements ICategoria {

        /**
         * Constructs a new Categoria.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICategoria);

        /** Categoria uuid. */
        public uuid: string;

        /** Categoria nome. */
        public nome: string;

        /** Categoria loja_uuid. */
        public loja_uuid: string;

        /** Categoria ordem. */
        public ordem: number;

        /** Categoria pizza_mode. */
        public pizza_mode: boolean;

        /** Categoria descricao. */
        public descricao: string;

        /** Categoria criado_em. */
        public criado_em: string;

        /**
         * Creates a new Categoria instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Categoria instance
         */
        public static create(properties?: chickie.ICategoria): chickie.Categoria;

        /**
         * Encodes the specified Categoria message. Does not implicitly {@link chickie.Categoria.verify|verify} messages.
         * @param message Categoria message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICategoria, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Categoria message, length delimited. Does not implicitly {@link chickie.Categoria.verify|verify} messages.
         * @param message Categoria message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICategoria, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Categoria message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Categoria
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Categoria;

        /**
         * Decodes a Categoria message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Categoria
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Categoria;

        /**
         * Verifies a Categoria message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Categoria message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Categoria
         */
        public static fromObject(object: { [k: string]: any }): chickie.Categoria;

        /**
         * Creates a plain object from a Categoria message. Also converts values to other types if specified.
         * @param message Categoria
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Categoria, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Categoria to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Categoria
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarCategoriasResponse. */
    interface IListarCategoriasResponse {

        /** ListarCategoriasResponse categorias */
        categorias?: (chickie.ICategoria[]|null);
    }

    /** Represents a ListarCategoriasResponse. */
    class ListarCategoriasResponse implements IListarCategoriasResponse {

        /**
         * Constructs a new ListarCategoriasResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarCategoriasResponse);

        /** ListarCategoriasResponse categorias. */
        public categorias: chickie.ICategoria[];

        /**
         * Creates a new ListarCategoriasResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarCategoriasResponse instance
         */
        public static create(properties?: chickie.IListarCategoriasResponse): chickie.ListarCategoriasResponse;

        /**
         * Encodes the specified ListarCategoriasResponse message. Does not implicitly {@link chickie.ListarCategoriasResponse.verify|verify} messages.
         * @param message ListarCategoriasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarCategoriasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarCategoriasResponse message, length delimited. Does not implicitly {@link chickie.ListarCategoriasResponse.verify|verify} messages.
         * @param message ListarCategoriasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarCategoriasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarCategoriasResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarCategoriasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarCategoriasResponse;

        /**
         * Decodes a ListarCategoriasResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarCategoriasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarCategoriasResponse;

        /**
         * Verifies a ListarCategoriasResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarCategoriasResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarCategoriasResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarCategoriasResponse;

        /**
         * Creates a plain object from a ListarCategoriasResponse message. Also converts values to other types if specified.
         * @param message ListarCategoriasResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarCategoriasResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarCategoriasResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarCategoriasResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Adicional. */
    interface IAdicional {

        /** Adicional uuid */
        uuid?: (string|null);

        /** Adicional nome */
        nome?: (string|null);

        /** Adicional preco */
        preco?: (number|null);

        /** Adicional disponivel */
        disponivel?: (boolean|null);

        /** Adicional loja_uuid */
        loja_uuid?: (string|null);

        /** Adicional descricao */
        descricao?: (string|null);

        /** Adicional criado_em */
        criado_em?: (string|null);
    }

    /** Represents an Adicional. */
    class Adicional implements IAdicional {

        /**
         * Constructs a new Adicional.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAdicional);

        /** Adicional uuid. */
        public uuid: string;

        /** Adicional nome. */
        public nome: string;

        /** Adicional preco. */
        public preco: number;

        /** Adicional disponivel. */
        public disponivel: boolean;

        /** Adicional loja_uuid. */
        public loja_uuid: string;

        /** Adicional descricao. */
        public descricao: string;

        /** Adicional criado_em. */
        public criado_em: string;

        /**
         * Creates a new Adicional instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Adicional instance
         */
        public static create(properties?: chickie.IAdicional): chickie.Adicional;

        /**
         * Encodes the specified Adicional message. Does not implicitly {@link chickie.Adicional.verify|verify} messages.
         * @param message Adicional message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAdicional, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Adicional message, length delimited. Does not implicitly {@link chickie.Adicional.verify|verify} messages.
         * @param message Adicional message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAdicional, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Adicional message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Adicional
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Adicional;

        /**
         * Decodes an Adicional message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Adicional
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Adicional;

        /**
         * Verifies an Adicional message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Adicional message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Adicional
         */
        public static fromObject(object: { [k: string]: any }): chickie.Adicional;

        /**
         * Creates a plain object from an Adicional message. Also converts values to other types if specified.
         * @param message Adicional
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Adicional, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Adicional to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Adicional
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarAdicionaisResponse. */
    interface IListarAdicionaisResponse {

        /** ListarAdicionaisResponse adicionais */
        adicionais?: (chickie.IAdicional[]|null);
    }

    /** Represents a ListarAdicionaisResponse. */
    class ListarAdicionaisResponse implements IListarAdicionaisResponse {

        /**
         * Constructs a new ListarAdicionaisResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarAdicionaisResponse);

        /** ListarAdicionaisResponse adicionais. */
        public adicionais: chickie.IAdicional[];

        /**
         * Creates a new ListarAdicionaisResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarAdicionaisResponse instance
         */
        public static create(properties?: chickie.IListarAdicionaisResponse): chickie.ListarAdicionaisResponse;

        /**
         * Encodes the specified ListarAdicionaisResponse message. Does not implicitly {@link chickie.ListarAdicionaisResponse.verify|verify} messages.
         * @param message ListarAdicionaisResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarAdicionaisResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarAdicionaisResponse message, length delimited. Does not implicitly {@link chickie.ListarAdicionaisResponse.verify|verify} messages.
         * @param message ListarAdicionaisResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarAdicionaisResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarAdicionaisResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarAdicionaisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarAdicionaisResponse;

        /**
         * Decodes a ListarAdicionaisResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarAdicionaisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarAdicionaisResponse;

        /**
         * Verifies a ListarAdicionaisResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarAdicionaisResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarAdicionaisResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarAdicionaisResponse;

        /**
         * Creates a plain object from a ListarAdicionaisResponse message. Also converts values to other types if specified.
         * @param message ListarAdicionaisResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarAdicionaisResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarAdicionaisResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarAdicionaisResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Pedido. */
    interface IPedido {

        /** Pedido uuid */
        uuid?: (string|null);

        /** Pedido usuario_uuid */
        usuario_uuid?: (string|null);

        /** Pedido loja_uuid */
        loja_uuid?: (string|null);

        /** Pedido entregador_uuid */
        entregador_uuid?: (string|null);

        /** Pedido status */
        status?: (string|null);

        /** Pedido total */
        total?: (number|null);

        /** Pedido subtotal */
        subtotal?: (number|null);

        /** Pedido taxa_entrega */
        taxa_entrega?: (number|null);

        /** Pedido desconto */
        desconto?: (number|null);

        /** Pedido forma_pagamento */
        forma_pagamento?: (string|null);

        /** Pedido observacoes */
        observacoes?: (string|null);

        /** Pedido tempo_estimado_min */
        tempo_estimado_min?: (number|null);

        /** Pedido criado_em */
        criado_em?: (string|null);

        /** Pedido atualizado_em */
        atualizado_em?: (string|null);

        /** Pedido itens */
        itens?: (chickie.IItemPedido[]|null);
    }

    /** Represents a Pedido. */
    class Pedido implements IPedido {

        /**
         * Constructs a new Pedido.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IPedido);

        /** Pedido uuid. */
        public uuid: string;

        /** Pedido usuario_uuid. */
        public usuario_uuid: string;

        /** Pedido loja_uuid. */
        public loja_uuid: string;

        /** Pedido entregador_uuid. */
        public entregador_uuid: string;

        /** Pedido status. */
        public status: string;

        /** Pedido total. */
        public total: number;

        /** Pedido subtotal. */
        public subtotal: number;

        /** Pedido taxa_entrega. */
        public taxa_entrega: number;

        /** Pedido desconto. */
        public desconto: number;

        /** Pedido forma_pagamento. */
        public forma_pagamento: string;

        /** Pedido observacoes. */
        public observacoes: string;

        /** Pedido tempo_estimado_min. */
        public tempo_estimado_min: number;

        /** Pedido criado_em. */
        public criado_em: string;

        /** Pedido atualizado_em. */
        public atualizado_em: string;

        /** Pedido itens. */
        public itens: chickie.IItemPedido[];

        /**
         * Creates a new Pedido instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pedido instance
         */
        public static create(properties?: chickie.IPedido): chickie.Pedido;

        /**
         * Encodes the specified Pedido message. Does not implicitly {@link chickie.Pedido.verify|verify} messages.
         * @param message Pedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pedido message, length delimited. Does not implicitly {@link chickie.Pedido.verify|verify} messages.
         * @param message Pedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pedido message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Pedido;

        /**
         * Decodes a Pedido message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Pedido;

        /**
         * Verifies a Pedido message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pedido message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pedido
         */
        public static fromObject(object: { [k: string]: any }): chickie.Pedido;

        /**
         * Creates a plain object from a Pedido message. Also converts values to other types if specified.
         * @param message Pedido
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Pedido, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pedido to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Pedido
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ItemPedido. */
    interface IItemPedido {

        /** ItemPedido uuid */
        uuid?: (string|null);

        /** ItemPedido loja_uuid */
        loja_uuid?: (string|null);

        /** ItemPedido pedido_uuid */
        pedido_uuid?: (string|null);

        /** ItemPedido quantidade */
        quantidade?: (number|null);

        /** ItemPedido observacoes */
        observacoes?: (string|null);

        /** ItemPedido partes */
        partes?: (chickie.IParteDeItemPedido[]|null);

        /** ItemPedido adicionais */
        adicionais?: (chickie.IAdicionalDeItemDePedido[]|null);
    }

    /** Represents an ItemPedido. */
    class ItemPedido implements IItemPedido {

        /**
         * Constructs a new ItemPedido.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IItemPedido);

        /** ItemPedido uuid. */
        public uuid: string;

        /** ItemPedido loja_uuid. */
        public loja_uuid: string;

        /** ItemPedido pedido_uuid. */
        public pedido_uuid: string;

        /** ItemPedido quantidade. */
        public quantidade: number;

        /** ItemPedido observacoes. */
        public observacoes: string;

        /** ItemPedido partes. */
        public partes: chickie.IParteDeItemPedido[];

        /** ItemPedido adicionais. */
        public adicionais: chickie.IAdicionalDeItemDePedido[];

        /**
         * Creates a new ItemPedido instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemPedido instance
         */
        public static create(properties?: chickie.IItemPedido): chickie.ItemPedido;

        /**
         * Encodes the specified ItemPedido message. Does not implicitly {@link chickie.ItemPedido.verify|verify} messages.
         * @param message ItemPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IItemPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemPedido message, length delimited. Does not implicitly {@link chickie.ItemPedido.verify|verify} messages.
         * @param message ItemPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IItemPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemPedido message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ItemPedido;

        /**
         * Decodes an ItemPedido message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ItemPedido;

        /**
         * Verifies an ItemPedido message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemPedido message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemPedido
         */
        public static fromObject(object: { [k: string]: any }): chickie.ItemPedido;

        /**
         * Creates a plain object from an ItemPedido message. Also converts values to other types if specified.
         * @param message ItemPedido
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ItemPedido, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemPedido to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemPedido
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ParteDeItemPedido. */
    interface IParteDeItemPedido {

        /** ParteDeItemPedido uuid */
        uuid?: (string|null);

        /** ParteDeItemPedido loja_uuid */
        loja_uuid?: (string|null);

        /** ParteDeItemPedido item_uuid */
        item_uuid?: (string|null);

        /** ParteDeItemPedido produto_nome */
        produto_nome?: (string|null);

        /** ParteDeItemPedido produto_uuid */
        produto_uuid?: (string|null);

        /** ParteDeItemPedido preco_unitario */
        preco_unitario?: (number|null);

        /** ParteDeItemPedido posicao */
        posicao?: (number|null);

        /** ParteDeItemPedido adicionais */
        adicionais?: (chickie.IAdicionalDeItemDePedido[]|null);
    }

    /** Represents a ParteDeItemPedido. */
    class ParteDeItemPedido implements IParteDeItemPedido {

        /**
         * Constructs a new ParteDeItemPedido.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IParteDeItemPedido);

        /** ParteDeItemPedido uuid. */
        public uuid: string;

        /** ParteDeItemPedido loja_uuid. */
        public loja_uuid: string;

        /** ParteDeItemPedido item_uuid. */
        public item_uuid: string;

        /** ParteDeItemPedido produto_nome. */
        public produto_nome: string;

        /** ParteDeItemPedido produto_uuid. */
        public produto_uuid: string;

        /** ParteDeItemPedido preco_unitario. */
        public preco_unitario: number;

        /** ParteDeItemPedido posicao. */
        public posicao: number;

        /** ParteDeItemPedido adicionais. */
        public adicionais: chickie.IAdicionalDeItemDePedido[];

        /**
         * Creates a new ParteDeItemPedido instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ParteDeItemPedido instance
         */
        public static create(properties?: chickie.IParteDeItemPedido): chickie.ParteDeItemPedido;

        /**
         * Encodes the specified ParteDeItemPedido message. Does not implicitly {@link chickie.ParteDeItemPedido.verify|verify} messages.
         * @param message ParteDeItemPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IParteDeItemPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ParteDeItemPedido message, length delimited. Does not implicitly {@link chickie.ParteDeItemPedido.verify|verify} messages.
         * @param message ParteDeItemPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IParteDeItemPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ParteDeItemPedido message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ParteDeItemPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ParteDeItemPedido;

        /**
         * Decodes a ParteDeItemPedido message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ParteDeItemPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ParteDeItemPedido;

        /**
         * Verifies a ParteDeItemPedido message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ParteDeItemPedido message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ParteDeItemPedido
         */
        public static fromObject(object: { [k: string]: any }): chickie.ParteDeItemPedido;

        /**
         * Creates a plain object from a ParteDeItemPedido message. Also converts values to other types if specified.
         * @param message ParteDeItemPedido
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ParteDeItemPedido, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ParteDeItemPedido to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ParteDeItemPedido
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AdicionalDeItemDePedido. */
    interface IAdicionalDeItemDePedido {

        /** AdicionalDeItemDePedido uuid */
        uuid?: (string|null);

        /** AdicionalDeItemDePedido item_uuid */
        item_uuid?: (string|null);

        /** AdicionalDeItemDePedido loja_uuid */
        loja_uuid?: (string|null);

        /** AdicionalDeItemDePedido nome */
        nome?: (string|null);

        /** AdicionalDeItemDePedido descricao */
        descricao?: (string|null);

        /** AdicionalDeItemDePedido preco */
        preco?: (number|null);
    }

    /** Represents an AdicionalDeItemDePedido. */
    class AdicionalDeItemDePedido implements IAdicionalDeItemDePedido {

        /**
         * Constructs a new AdicionalDeItemDePedido.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAdicionalDeItemDePedido);

        /** AdicionalDeItemDePedido uuid. */
        public uuid: string;

        /** AdicionalDeItemDePedido item_uuid. */
        public item_uuid: string;

        /** AdicionalDeItemDePedido loja_uuid. */
        public loja_uuid: string;

        /** AdicionalDeItemDePedido nome. */
        public nome: string;

        /** AdicionalDeItemDePedido descricao. */
        public descricao: string;

        /** AdicionalDeItemDePedido preco. */
        public preco: number;

        /**
         * Creates a new AdicionalDeItemDePedido instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdicionalDeItemDePedido instance
         */
        public static create(properties?: chickie.IAdicionalDeItemDePedido): chickie.AdicionalDeItemDePedido;

        /**
         * Encodes the specified AdicionalDeItemDePedido message. Does not implicitly {@link chickie.AdicionalDeItemDePedido.verify|verify} messages.
         * @param message AdicionalDeItemDePedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAdicionalDeItemDePedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdicionalDeItemDePedido message, length delimited. Does not implicitly {@link chickie.AdicionalDeItemDePedido.verify|verify} messages.
         * @param message AdicionalDeItemDePedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAdicionalDeItemDePedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdicionalDeItemDePedido message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdicionalDeItemDePedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AdicionalDeItemDePedido;

        /**
         * Decodes an AdicionalDeItemDePedido message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdicionalDeItemDePedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AdicionalDeItemDePedido;

        /**
         * Verifies an AdicionalDeItemDePedido message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdicionalDeItemDePedido message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdicionalDeItemDePedido
         */
        public static fromObject(object: { [k: string]: any }): chickie.AdicionalDeItemDePedido;

        /**
         * Creates a plain object from an AdicionalDeItemDePedido message. Also converts values to other types if specified.
         * @param message AdicionalDeItemDePedido
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AdicionalDeItemDePedido, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdicionalDeItemDePedido to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AdicionalDeItemDePedido
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarPedidosResponse. */
    interface IListarPedidosResponse {

        /** ListarPedidosResponse pedidos */
        pedidos?: (chickie.IPedido[]|null);
    }

    /** Represents a ListarPedidosResponse. */
    class ListarPedidosResponse implements IListarPedidosResponse {

        /**
         * Constructs a new ListarPedidosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarPedidosResponse);

        /** ListarPedidosResponse pedidos. */
        public pedidos: chickie.IPedido[];

        /**
         * Creates a new ListarPedidosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarPedidosResponse instance
         */
        public static create(properties?: chickie.IListarPedidosResponse): chickie.ListarPedidosResponse;

        /**
         * Encodes the specified ListarPedidosResponse message. Does not implicitly {@link chickie.ListarPedidosResponse.verify|verify} messages.
         * @param message ListarPedidosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarPedidosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarPedidosResponse message, length delimited. Does not implicitly {@link chickie.ListarPedidosResponse.verify|verify} messages.
         * @param message ListarPedidosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarPedidosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarPedidosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarPedidosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarPedidosResponse;

        /**
         * Decodes a ListarPedidosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarPedidosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarPedidosResponse;

        /**
         * Verifies a ListarPedidosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarPedidosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarPedidosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarPedidosResponse;

        /**
         * Creates a plain object from a ListarPedidosResponse message. Also converts values to other types if specified.
         * @param message ListarPedidosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarPedidosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarPedidosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarPedidosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Cupom. */
    interface ICupom {

        /** Cupom uuid */
        uuid?: (string|null);

        /** Cupom loja_uuid */
        loja_uuid?: (string|null);

        /** Cupom codigo */
        codigo?: (string|null);

        /** Cupom descricao */
        descricao?: (string|null);

        /** Cupom tipo_desconto */
        tipo_desconto?: (string|null);

        /** Cupom valor_desconto */
        valor_desconto?: (number|null);

        /** Cupom valor_minimo */
        valor_minimo?: (number|null);

        /** Cupom data_validade */
        data_validade?: (string|null);

        /** Cupom limite_uso */
        limite_uso?: (number|null);

        /** Cupom uso_atual */
        uso_atual?: (number|null);

        /** Cupom status */
        status?: (string|null);

        /** Cupom criado_em */
        criado_em?: (string|null);
    }

    /** Represents a Cupom. */
    class Cupom implements ICupom {

        /**
         * Constructs a new Cupom.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICupom);

        /** Cupom uuid. */
        public uuid: string;

        /** Cupom loja_uuid. */
        public loja_uuid: string;

        /** Cupom codigo. */
        public codigo: string;

        /** Cupom descricao. */
        public descricao: string;

        /** Cupom tipo_desconto. */
        public tipo_desconto: string;

        /** Cupom valor_desconto. */
        public valor_desconto: number;

        /** Cupom valor_minimo. */
        public valor_minimo: number;

        /** Cupom data_validade. */
        public data_validade: string;

        /** Cupom limite_uso. */
        public limite_uso: number;

        /** Cupom uso_atual. */
        public uso_atual: number;

        /** Cupom status. */
        public status: string;

        /** Cupom criado_em. */
        public criado_em: string;

        /**
         * Creates a new Cupom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cupom instance
         */
        public static create(properties?: chickie.ICupom): chickie.Cupom;

        /**
         * Encodes the specified Cupom message. Does not implicitly {@link chickie.Cupom.verify|verify} messages.
         * @param message Cupom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICupom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cupom message, length delimited. Does not implicitly {@link chickie.Cupom.verify|verify} messages.
         * @param message Cupom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICupom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cupom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cupom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Cupom;

        /**
         * Decodes a Cupom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cupom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Cupom;

        /**
         * Verifies a Cupom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cupom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cupom
         */
        public static fromObject(object: { [k: string]: any }): chickie.Cupom;

        /**
         * Creates a plain object from a Cupom message. Also converts values to other types if specified.
         * @param message Cupom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Cupom, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cupom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Cupom
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarCuponsResponse. */
    interface IListarCuponsResponse {

        /** ListarCuponsResponse cupons */
        cupons?: (chickie.ICupom[]|null);
    }

    /** Represents a ListarCuponsResponse. */
    class ListarCuponsResponse implements IListarCuponsResponse {

        /**
         * Constructs a new ListarCuponsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarCuponsResponse);

        /** ListarCuponsResponse cupons. */
        public cupons: chickie.ICupom[];

        /**
         * Creates a new ListarCuponsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarCuponsResponse instance
         */
        public static create(properties?: chickie.IListarCuponsResponse): chickie.ListarCuponsResponse;

        /**
         * Encodes the specified ListarCuponsResponse message. Does not implicitly {@link chickie.ListarCuponsResponse.verify|verify} messages.
         * @param message ListarCuponsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarCuponsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarCuponsResponse message, length delimited. Does not implicitly {@link chickie.ListarCuponsResponse.verify|verify} messages.
         * @param message ListarCuponsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarCuponsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarCuponsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarCuponsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarCuponsResponse;

        /**
         * Decodes a ListarCuponsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarCuponsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarCuponsResponse;

        /**
         * Verifies a ListarCuponsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarCuponsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarCuponsResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarCuponsResponse;

        /**
         * Creates a plain object from a ListarCuponsResponse message. Also converts values to other types if specified.
         * @param message ListarCuponsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarCuponsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarCuponsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarCuponsResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AvaliacaoLoja. */
    interface IAvaliacaoLoja {

        /** AvaliacaoLoja uuid */
        uuid?: (string|null);

        /** AvaliacaoLoja loja_uuid */
        loja_uuid?: (string|null);

        /** AvaliacaoLoja usuario_uuid */
        usuario_uuid?: (string|null);

        /** AvaliacaoLoja nota */
        nota?: (number|null);

        /** AvaliacaoLoja comentario */
        comentario?: (string|null);

        /** AvaliacaoLoja criado_em */
        criado_em?: (string|null);

        /** AvaliacaoLoja usuario_nome */
        usuario_nome?: (string|null);

        /** AvaliacaoLoja usuario_email */
        usuario_email?: (string|null);
    }

    /** Represents an AvaliacaoLoja. */
    class AvaliacaoLoja implements IAvaliacaoLoja {

        /**
         * Constructs a new AvaliacaoLoja.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAvaliacaoLoja);

        /** AvaliacaoLoja uuid. */
        public uuid: string;

        /** AvaliacaoLoja loja_uuid. */
        public loja_uuid: string;

        /** AvaliacaoLoja usuario_uuid. */
        public usuario_uuid: string;

        /** AvaliacaoLoja nota. */
        public nota: number;

        /** AvaliacaoLoja comentario. */
        public comentario: string;

        /** AvaliacaoLoja criado_em. */
        public criado_em: string;

        /** AvaliacaoLoja usuario_nome. */
        public usuario_nome: string;

        /** AvaliacaoLoja usuario_email. */
        public usuario_email: string;

        /**
         * Creates a new AvaliacaoLoja instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AvaliacaoLoja instance
         */
        public static create(properties?: chickie.IAvaliacaoLoja): chickie.AvaliacaoLoja;

        /**
         * Encodes the specified AvaliacaoLoja message. Does not implicitly {@link chickie.AvaliacaoLoja.verify|verify} messages.
         * @param message AvaliacaoLoja message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAvaliacaoLoja, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AvaliacaoLoja message, length delimited. Does not implicitly {@link chickie.AvaliacaoLoja.verify|verify} messages.
         * @param message AvaliacaoLoja message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAvaliacaoLoja, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AvaliacaoLoja message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AvaliacaoLoja
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AvaliacaoLoja;

        /**
         * Decodes an AvaliacaoLoja message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AvaliacaoLoja
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AvaliacaoLoja;

        /**
         * Verifies an AvaliacaoLoja message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AvaliacaoLoja message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AvaliacaoLoja
         */
        public static fromObject(object: { [k: string]: any }): chickie.AvaliacaoLoja;

        /**
         * Creates a plain object from an AvaliacaoLoja message. Also converts values to other types if specified.
         * @param message AvaliacaoLoja
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AvaliacaoLoja, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AvaliacaoLoja to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AvaliacaoLoja
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarAvaliacoesLojaResponse. */
    interface IListarAvaliacoesLojaResponse {

        /** ListarAvaliacoesLojaResponse avaliacoes */
        avaliacoes?: (chickie.IAvaliacaoLoja[]|null);
    }

    /** Represents a ListarAvaliacoesLojaResponse. */
    class ListarAvaliacoesLojaResponse implements IListarAvaliacoesLojaResponse {

        /**
         * Constructs a new ListarAvaliacoesLojaResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarAvaliacoesLojaResponse);

        /** ListarAvaliacoesLojaResponse avaliacoes. */
        public avaliacoes: chickie.IAvaliacaoLoja[];

        /**
         * Creates a new ListarAvaliacoesLojaResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarAvaliacoesLojaResponse instance
         */
        public static create(properties?: chickie.IListarAvaliacoesLojaResponse): chickie.ListarAvaliacoesLojaResponse;

        /**
         * Encodes the specified ListarAvaliacoesLojaResponse message. Does not implicitly {@link chickie.ListarAvaliacoesLojaResponse.verify|verify} messages.
         * @param message ListarAvaliacoesLojaResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarAvaliacoesLojaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarAvaliacoesLojaResponse message, length delimited. Does not implicitly {@link chickie.ListarAvaliacoesLojaResponse.verify|verify} messages.
         * @param message ListarAvaliacoesLojaResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarAvaliacoesLojaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarAvaliacoesLojaResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarAvaliacoesLojaResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarAvaliacoesLojaResponse;

        /**
         * Decodes a ListarAvaliacoesLojaResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarAvaliacoesLojaResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarAvaliacoesLojaResponse;

        /**
         * Verifies a ListarAvaliacoesLojaResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarAvaliacoesLojaResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarAvaliacoesLojaResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarAvaliacoesLojaResponse;

        /**
         * Creates a plain object from a ListarAvaliacoesLojaResponse message. Also converts values to other types if specified.
         * @param message ListarAvaliacoesLojaResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarAvaliacoesLojaResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarAvaliacoesLojaResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarAvaliacoesLojaResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AvaliacaoProduto. */
    interface IAvaliacaoProduto {

        /** AvaliacaoProduto uuid */
        uuid?: (string|null);

        /** AvaliacaoProduto usuario_uuid */
        usuario_uuid?: (string|null);

        /** AvaliacaoProduto loja_uuid */
        loja_uuid?: (string|null);

        /** AvaliacaoProduto produto_uuid */
        produto_uuid?: (string|null);

        /** AvaliacaoProduto nota */
        nota?: (number|null);

        /** AvaliacaoProduto descricao */
        descricao?: (string|null);

        /** AvaliacaoProduto comentario */
        comentario?: (string|null);

        /** AvaliacaoProduto criado_em */
        criado_em?: (string|null);
    }

    /** Represents an AvaliacaoProduto. */
    class AvaliacaoProduto implements IAvaliacaoProduto {

        /**
         * Constructs a new AvaliacaoProduto.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IAvaliacaoProduto);

        /** AvaliacaoProduto uuid. */
        public uuid: string;

        /** AvaliacaoProduto usuario_uuid. */
        public usuario_uuid: string;

        /** AvaliacaoProduto loja_uuid. */
        public loja_uuid: string;

        /** AvaliacaoProduto produto_uuid. */
        public produto_uuid: string;

        /** AvaliacaoProduto nota. */
        public nota: number;

        /** AvaliacaoProduto descricao. */
        public descricao: string;

        /** AvaliacaoProduto comentario. */
        public comentario: string;

        /** AvaliacaoProduto criado_em. */
        public criado_em: string;

        /**
         * Creates a new AvaliacaoProduto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AvaliacaoProduto instance
         */
        public static create(properties?: chickie.IAvaliacaoProduto): chickie.AvaliacaoProduto;

        /**
         * Encodes the specified AvaliacaoProduto message. Does not implicitly {@link chickie.AvaliacaoProduto.verify|verify} messages.
         * @param message AvaliacaoProduto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IAvaliacaoProduto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AvaliacaoProduto message, length delimited. Does not implicitly {@link chickie.AvaliacaoProduto.verify|verify} messages.
         * @param message AvaliacaoProduto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IAvaliacaoProduto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AvaliacaoProduto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AvaliacaoProduto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.AvaliacaoProduto;

        /**
         * Decodes an AvaliacaoProduto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AvaliacaoProduto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.AvaliacaoProduto;

        /**
         * Verifies an AvaliacaoProduto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AvaliacaoProduto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AvaliacaoProduto
         */
        public static fromObject(object: { [k: string]: any }): chickie.AvaliacaoProduto;

        /**
         * Creates a plain object from an AvaliacaoProduto message. Also converts values to other types if specified.
         * @param message AvaliacaoProduto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.AvaliacaoProduto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AvaliacaoProduto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AvaliacaoProduto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarAvaliacoesProdutoResponse. */
    interface IListarAvaliacoesProdutoResponse {

        /** ListarAvaliacoesProdutoResponse avaliacoes */
        avaliacoes?: (chickie.IAvaliacaoProduto[]|null);
    }

    /** Represents a ListarAvaliacoesProdutoResponse. */
    class ListarAvaliacoesProdutoResponse implements IListarAvaliacoesProdutoResponse {

        /**
         * Constructs a new ListarAvaliacoesProdutoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarAvaliacoesProdutoResponse);

        /** ListarAvaliacoesProdutoResponse avaliacoes. */
        public avaliacoes: chickie.IAvaliacaoProduto[];

        /**
         * Creates a new ListarAvaliacoesProdutoResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarAvaliacoesProdutoResponse instance
         */
        public static create(properties?: chickie.IListarAvaliacoesProdutoResponse): chickie.ListarAvaliacoesProdutoResponse;

        /**
         * Encodes the specified ListarAvaliacoesProdutoResponse message. Does not implicitly {@link chickie.ListarAvaliacoesProdutoResponse.verify|verify} messages.
         * @param message ListarAvaliacoesProdutoResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarAvaliacoesProdutoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarAvaliacoesProdutoResponse message, length delimited. Does not implicitly {@link chickie.ListarAvaliacoesProdutoResponse.verify|verify} messages.
         * @param message ListarAvaliacoesProdutoResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarAvaliacoesProdutoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarAvaliacoesProdutoResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarAvaliacoesProdutoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarAvaliacoesProdutoResponse;

        /**
         * Decodes a ListarAvaliacoesProdutoResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarAvaliacoesProdutoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarAvaliacoesProdutoResponse;

        /**
         * Verifies a ListarAvaliacoesProdutoResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarAvaliacoesProdutoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarAvaliacoesProdutoResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarAvaliacoesProdutoResponse;

        /**
         * Creates a plain object from a ListarAvaliacoesProdutoResponse message. Also converts values to other types if specified.
         * @param message ListarAvaliacoesProdutoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarAvaliacoesProdutoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarAvaliacoesProdutoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarAvaliacoesProdutoResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Promocao. */
    interface IPromocao {

        /** Promocao uuid */
        uuid?: (string|null);

        /** Promocao loja_uuid */
        loja_uuid?: (string|null);

        /** Promocao nome */
        nome?: (string|null);

        /** Promocao descricao */
        descricao?: (string|null);

        /** Promocao tipo_desconto */
        tipo_desconto?: (string|null);

        /** Promocao valor_desconto */
        valor_desconto?: (number|null);

        /** Promocao valor_minimo */
        valor_minimo?: (number|null);

        /** Promocao data_inicio */
        data_inicio?: (string|null);

        /** Promocao data_fim */
        data_fim?: (string|null);

        /** Promocao dias_semana_validos */
        dias_semana_validos?: (number[]|null);

        /** Promocao tipo_escopo */
        tipo_escopo?: (string|null);

        /** Promocao produto_uuid */
        produto_uuid?: (string|null);

        /** Promocao categoria_uuid */
        categoria_uuid?: (string|null);

        /** Promocao status */
        status?: (string|null);

        /** Promocao prioridade */
        prioridade?: (number|null);

        /** Promocao criado_em */
        criado_em?: (string|null);
    }

    /** Represents a Promocao. */
    class Promocao implements IPromocao {

        /**
         * Constructs a new Promocao.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IPromocao);

        /** Promocao uuid. */
        public uuid: string;

        /** Promocao loja_uuid. */
        public loja_uuid: string;

        /** Promocao nome. */
        public nome: string;

        /** Promocao descricao. */
        public descricao: string;

        /** Promocao tipo_desconto. */
        public tipo_desconto: string;

        /** Promocao valor_desconto. */
        public valor_desconto: number;

        /** Promocao valor_minimo. */
        public valor_minimo: number;

        /** Promocao data_inicio. */
        public data_inicio: string;

        /** Promocao data_fim. */
        public data_fim: string;

        /** Promocao dias_semana_validos. */
        public dias_semana_validos: number[];

        /** Promocao tipo_escopo. */
        public tipo_escopo: string;

        /** Promocao produto_uuid. */
        public produto_uuid: string;

        /** Promocao categoria_uuid. */
        public categoria_uuid: string;

        /** Promocao status. */
        public status: string;

        /** Promocao prioridade. */
        public prioridade: number;

        /** Promocao criado_em. */
        public criado_em: string;

        /**
         * Creates a new Promocao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Promocao instance
         */
        public static create(properties?: chickie.IPromocao): chickie.Promocao;

        /**
         * Encodes the specified Promocao message. Does not implicitly {@link chickie.Promocao.verify|verify} messages.
         * @param message Promocao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IPromocao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Promocao message, length delimited. Does not implicitly {@link chickie.Promocao.verify|verify} messages.
         * @param message Promocao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IPromocao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Promocao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Promocao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Promocao;

        /**
         * Decodes a Promocao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Promocao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Promocao;

        /**
         * Verifies a Promocao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Promocao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Promocao
         */
        public static fromObject(object: { [k: string]: any }): chickie.Promocao;

        /**
         * Creates a plain object from a Promocao message. Also converts values to other types if specified.
         * @param message Promocao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Promocao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Promocao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Promocao
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarPromocoesResponse. */
    interface IListarPromocoesResponse {

        /** ListarPromocoesResponse promocoes */
        promocoes?: (chickie.IPromocao[]|null);
    }

    /** Represents a ListarPromocoesResponse. */
    class ListarPromocoesResponse implements IListarPromocoesResponse {

        /**
         * Constructs a new ListarPromocoesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarPromocoesResponse);

        /** ListarPromocoesResponse promocoes. */
        public promocoes: chickie.IPromocao[];

        /**
         * Creates a new ListarPromocoesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarPromocoesResponse instance
         */
        public static create(properties?: chickie.IListarPromocoesResponse): chickie.ListarPromocoesResponse;

        /**
         * Encodes the specified ListarPromocoesResponse message. Does not implicitly {@link chickie.ListarPromocoesResponse.verify|verify} messages.
         * @param message ListarPromocoesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarPromocoesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarPromocoesResponse message, length delimited. Does not implicitly {@link chickie.ListarPromocoesResponse.verify|verify} messages.
         * @param message ListarPromocoesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarPromocoesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarPromocoesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarPromocoesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarPromocoesResponse;

        /**
         * Decodes a ListarPromocoesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarPromocoesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarPromocoesResponse;

        /**
         * Verifies a ListarPromocoesResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarPromocoesResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarPromocoesResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarPromocoesResponse;

        /**
         * Creates a plain object from a ListarPromocoesResponse message. Also converts values to other types if specified.
         * @param message ListarPromocoesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarPromocoesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarPromocoesResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarPromocoesResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Endereco. */
    interface IEndereco {

        /** Endereco uuid */
        uuid?: (string|null);

        /** Endereco cep */
        cep?: (string|null);

        /** Endereco logradouro */
        logradouro?: (string|null);

        /** Endereco numero */
        numero?: (string|null);

        /** Endereco complemento */
        complemento?: (string|null);

        /** Endereco bairro */
        bairro?: (string|null);

        /** Endereco cidade */
        cidade?: (string|null);

        /** Endereco estado */
        estado?: (string|null);

        /** Endereco latitude */
        latitude?: (number|null);

        /** Endereco longitude */
        longitude?: (number|null);

        /** Endereco criado_em */
        criado_em?: (string|null);

        /** Endereco usuario_uuid */
        usuario_uuid?: (string|null);

        /** Endereco loja_uuid */
        loja_uuid?: (string|null);
    }

    /** Represents an Endereco. */
    class Endereco implements IEndereco {

        /**
         * Constructs a new Endereco.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IEndereco);

        /** Endereco uuid. */
        public uuid: string;

        /** Endereco cep. */
        public cep: string;

        /** Endereco logradouro. */
        public logradouro: string;

        /** Endereco numero. */
        public numero: string;

        /** Endereco complemento. */
        public complemento: string;

        /** Endereco bairro. */
        public bairro: string;

        /** Endereco cidade. */
        public cidade: string;

        /** Endereco estado. */
        public estado: string;

        /** Endereco latitude. */
        public latitude: number;

        /** Endereco longitude. */
        public longitude: number;

        /** Endereco criado_em. */
        public criado_em: string;

        /** Endereco usuario_uuid. */
        public usuario_uuid: string;

        /** Endereco loja_uuid. */
        public loja_uuid: string;

        /**
         * Creates a new Endereco instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Endereco instance
         */
        public static create(properties?: chickie.IEndereco): chickie.Endereco;

        /**
         * Encodes the specified Endereco message. Does not implicitly {@link chickie.Endereco.verify|verify} messages.
         * @param message Endereco message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IEndereco, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Endereco message, length delimited. Does not implicitly {@link chickie.Endereco.verify|verify} messages.
         * @param message Endereco message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IEndereco, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Endereco message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Endereco
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Endereco;

        /**
         * Decodes an Endereco message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Endereco
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Endereco;

        /**
         * Verifies an Endereco message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Endereco message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Endereco
         */
        public static fromObject(object: { [k: string]: any }): chickie.Endereco;

        /**
         * Creates a plain object from an Endereco message. Also converts values to other types if specified.
         * @param message Endereco
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Endereco, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Endereco to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Endereco
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarEnderecosResponse. */
    interface IListarEnderecosResponse {

        /** ListarEnderecosResponse enderecos */
        enderecos?: (chickie.IEndereco[]|null);
    }

    /** Represents a ListarEnderecosResponse. */
    class ListarEnderecosResponse implements IListarEnderecosResponse {

        /**
         * Constructs a new ListarEnderecosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarEnderecosResponse);

        /** ListarEnderecosResponse enderecos. */
        public enderecos: chickie.IEndereco[];

        /**
         * Creates a new ListarEnderecosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarEnderecosResponse instance
         */
        public static create(properties?: chickie.IListarEnderecosResponse): chickie.ListarEnderecosResponse;

        /**
         * Encodes the specified ListarEnderecosResponse message. Does not implicitly {@link chickie.ListarEnderecosResponse.verify|verify} messages.
         * @param message ListarEnderecosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarEnderecosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarEnderecosResponse message, length delimited. Does not implicitly {@link chickie.ListarEnderecosResponse.verify|verify} messages.
         * @param message ListarEnderecosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarEnderecosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarEnderecosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarEnderecosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarEnderecosResponse;

        /**
         * Decodes a ListarEnderecosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarEnderecosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarEnderecosResponse;

        /**
         * Verifies a ListarEnderecosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarEnderecosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarEnderecosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarEnderecosResponse;

        /**
         * Creates a plain object from a ListarEnderecosResponse message. Also converts values to other types if specified.
         * @param message ListarEnderecosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarEnderecosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarEnderecosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarEnderecosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Funcionario. */
    interface IFuncionario {

        /** Funcionario uuid */
        uuid?: (string|null);

        /** Funcionario loja_uuid */
        loja_uuid?: (string|null);

        /** Funcionario usuario_uuid */
        usuario_uuid?: (string|null);

        /** Funcionario cargo */
        cargo?: (string|null);

        /** Funcionario salario */
        salario?: (number|null);

        /** Funcionario data_admissao */
        data_admissao?: (string|null);

        /** Funcionario criado_em */
        criado_em?: (string|null);
    }

    /** Represents a Funcionario. */
    class Funcionario implements IFuncionario {

        /**
         * Constructs a new Funcionario.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IFuncionario);

        /** Funcionario uuid. */
        public uuid: string;

        /** Funcionario loja_uuid. */
        public loja_uuid: string;

        /** Funcionario usuario_uuid. */
        public usuario_uuid: string;

        /** Funcionario cargo. */
        public cargo: string;

        /** Funcionario salario. */
        public salario: number;

        /** Funcionario data_admissao. */
        public data_admissao: string;

        /** Funcionario criado_em. */
        public criado_em: string;

        /**
         * Creates a new Funcionario instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Funcionario instance
         */
        public static create(properties?: chickie.IFuncionario): chickie.Funcionario;

        /**
         * Encodes the specified Funcionario message. Does not implicitly {@link chickie.Funcionario.verify|verify} messages.
         * @param message Funcionario message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IFuncionario, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Funcionario message, length delimited. Does not implicitly {@link chickie.Funcionario.verify|verify} messages.
         * @param message Funcionario message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IFuncionario, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Funcionario message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Funcionario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Funcionario;

        /**
         * Decodes a Funcionario message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Funcionario
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Funcionario;

        /**
         * Verifies a Funcionario message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Funcionario message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Funcionario
         */
        public static fromObject(object: { [k: string]: any }): chickie.Funcionario;

        /**
         * Creates a plain object from a Funcionario message. Also converts values to other types if specified.
         * @param message Funcionario
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Funcionario, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Funcionario to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Funcionario
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarFuncionariosResponse. */
    interface IListarFuncionariosResponse {

        /** ListarFuncionariosResponse funcionarios */
        funcionarios?: (chickie.IFuncionario[]|null);
    }

    /** Represents a ListarFuncionariosResponse. */
    class ListarFuncionariosResponse implements IListarFuncionariosResponse {

        /**
         * Constructs a new ListarFuncionariosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarFuncionariosResponse);

        /** ListarFuncionariosResponse funcionarios. */
        public funcionarios: chickie.IFuncionario[];

        /**
         * Creates a new ListarFuncionariosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarFuncionariosResponse instance
         */
        public static create(properties?: chickie.IListarFuncionariosResponse): chickie.ListarFuncionariosResponse;

        /**
         * Encodes the specified ListarFuncionariosResponse message. Does not implicitly {@link chickie.ListarFuncionariosResponse.verify|verify} messages.
         * @param message ListarFuncionariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarFuncionariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarFuncionariosResponse message, length delimited. Does not implicitly {@link chickie.ListarFuncionariosResponse.verify|verify} messages.
         * @param message ListarFuncionariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarFuncionariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarFuncionariosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarFuncionariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarFuncionariosResponse;

        /**
         * Decodes a ListarFuncionariosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarFuncionariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarFuncionariosResponse;

        /**
         * Verifies a ListarFuncionariosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarFuncionariosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarFuncionariosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarFuncionariosResponse;

        /**
         * Creates a plain object from a ListarFuncionariosResponse message. Also converts values to other types if specified.
         * @param message ListarFuncionariosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarFuncionariosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarFuncionariosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarFuncionariosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Entregador. */
    interface IEntregador {

        /** Entregador uuid */
        uuid?: (string|null);

        /** Entregador loja_uuid */
        loja_uuid?: (string|null);

        /** Entregador usuario_uuid */
        usuario_uuid?: (string|null);

        /** Entregador veiculo */
        veiculo?: (string|null);

        /** Entregador placa */
        placa?: (string|null);

        /** Entregador disponivel */
        disponivel?: (boolean|null);

        /** Entregador criado_em */
        criado_em?: (string|null);
    }

    /** Represents an Entregador. */
    class Entregador implements IEntregador {

        /**
         * Constructs a new Entregador.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IEntregador);

        /** Entregador uuid. */
        public uuid: string;

        /** Entregador loja_uuid. */
        public loja_uuid: string;

        /** Entregador usuario_uuid. */
        public usuario_uuid: string;

        /** Entregador veiculo. */
        public veiculo: string;

        /** Entregador placa. */
        public placa: string;

        /** Entregador disponivel. */
        public disponivel: boolean;

        /** Entregador criado_em. */
        public criado_em: string;

        /**
         * Creates a new Entregador instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Entregador instance
         */
        public static create(properties?: chickie.IEntregador): chickie.Entregador;

        /**
         * Encodes the specified Entregador message. Does not implicitly {@link chickie.Entregador.verify|verify} messages.
         * @param message Entregador message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IEntregador, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Entregador message, length delimited. Does not implicitly {@link chickie.Entregador.verify|verify} messages.
         * @param message Entregador message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IEntregador, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Entregador message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Entregador
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Entregador;

        /**
         * Decodes an Entregador message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Entregador
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Entregador;

        /**
         * Verifies an Entregador message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Entregador message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Entregador
         */
        public static fromObject(object: { [k: string]: any }): chickie.Entregador;

        /**
         * Creates a plain object from an Entregador message. Also converts values to other types if specified.
         * @param message Entregador
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Entregador, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entregador to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Entregador
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarEntregadoresResponse. */
    interface IListarEntregadoresResponse {

        /** ListarEntregadoresResponse entregadores */
        entregadores?: (chickie.IEntregador[]|null);
    }

    /** Represents a ListarEntregadoresResponse. */
    class ListarEntregadoresResponse implements IListarEntregadoresResponse {

        /**
         * Constructs a new ListarEntregadoresResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarEntregadoresResponse);

        /** ListarEntregadoresResponse entregadores. */
        public entregadores: chickie.IEntregador[];

        /**
         * Creates a new ListarEntregadoresResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarEntregadoresResponse instance
         */
        public static create(properties?: chickie.IListarEntregadoresResponse): chickie.ListarEntregadoresResponse;

        /**
         * Encodes the specified ListarEntregadoresResponse message. Does not implicitly {@link chickie.ListarEntregadoresResponse.verify|verify} messages.
         * @param message ListarEntregadoresResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarEntregadoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarEntregadoresResponse message, length delimited. Does not implicitly {@link chickie.ListarEntregadoresResponse.verify|verify} messages.
         * @param message ListarEntregadoresResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarEntregadoresResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarEntregadoresResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarEntregadoresResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarEntregadoresResponse;

        /**
         * Decodes a ListarEntregadoresResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarEntregadoresResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarEntregadoresResponse;

        /**
         * Verifies a ListarEntregadoresResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarEntregadoresResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarEntregadoresResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarEntregadoresResponse;

        /**
         * Creates a plain object from a ListarEntregadoresResponse message. Also converts values to other types if specified.
         * @param message ListarEntregadoresResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarEntregadoresResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarEntregadoresResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarEntregadoresResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Cliente. */
    interface ICliente {

        /** Cliente uuid */
        uuid?: (string|null);

        /** Cliente usuario_uuid */
        usuario_uuid?: (string|null);

        /** Cliente loja_uuid */
        loja_uuid?: (string|null);

        /** Cliente criado_em */
        criado_em?: (string|null);
    }

    /** Represents a Cliente. */
    class Cliente implements ICliente {

        /**
         * Constructs a new Cliente.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ICliente);

        /** Cliente uuid. */
        public uuid: string;

        /** Cliente usuario_uuid. */
        public usuario_uuid: string;

        /** Cliente loja_uuid. */
        public loja_uuid: string;

        /** Cliente criado_em. */
        public criado_em: string;

        /**
         * Creates a new Cliente instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cliente instance
         */
        public static create(properties?: chickie.ICliente): chickie.Cliente;

        /**
         * Encodes the specified Cliente message. Does not implicitly {@link chickie.Cliente.verify|verify} messages.
         * @param message Cliente message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ICliente, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cliente message, length delimited. Does not implicitly {@link chickie.Cliente.verify|verify} messages.
         * @param message Cliente message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ICliente, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cliente message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cliente
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Cliente;

        /**
         * Decodes a Cliente message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cliente
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Cliente;

        /**
         * Verifies a Cliente message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cliente message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cliente
         */
        public static fromObject(object: { [k: string]: any }): chickie.Cliente;

        /**
         * Creates a plain object from a Cliente message. Also converts values to other types if specified.
         * @param message Cliente
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Cliente, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cliente to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Cliente
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LojaFavorita. */
    interface ILojaFavorita {

        /** LojaFavorita uuid */
        uuid?: (string|null);

        /** LojaFavorita usuario_uuid */
        usuario_uuid?: (string|null);

        /** LojaFavorita loja_uuid */
        loja_uuid?: (string|null);

        /** LojaFavorita criado_em */
        criado_em?: (string|null);
    }

    /** Represents a LojaFavorita. */
    class LojaFavorita implements ILojaFavorita {

        /**
         * Constructs a new LojaFavorita.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ILojaFavorita);

        /** LojaFavorita uuid. */
        public uuid: string;

        /** LojaFavorita usuario_uuid. */
        public usuario_uuid: string;

        /** LojaFavorita loja_uuid. */
        public loja_uuid: string;

        /** LojaFavorita criado_em. */
        public criado_em: string;

        /**
         * Creates a new LojaFavorita instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LojaFavorita instance
         */
        public static create(properties?: chickie.ILojaFavorita): chickie.LojaFavorita;

        /**
         * Encodes the specified LojaFavorita message. Does not implicitly {@link chickie.LojaFavorita.verify|verify} messages.
         * @param message LojaFavorita message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ILojaFavorita, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LojaFavorita message, length delimited. Does not implicitly {@link chickie.LojaFavorita.verify|verify} messages.
         * @param message LojaFavorita message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ILojaFavorita, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LojaFavorita message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LojaFavorita
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.LojaFavorita;

        /**
         * Decodes a LojaFavorita message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LojaFavorita
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.LojaFavorita;

        /**
         * Verifies a LojaFavorita message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LojaFavorita message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LojaFavorita
         */
        public static fromObject(object: { [k: string]: any }): chickie.LojaFavorita;

        /**
         * Creates a plain object from a LojaFavorita message. Also converts values to other types if specified.
         * @param message LojaFavorita
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.LojaFavorita, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LojaFavorita to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LojaFavorita
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarLojasFavoritasResponse. */
    interface IListarLojasFavoritasResponse {

        /** ListarLojasFavoritasResponse favoritas */
        favoritas?: (chickie.ILojaFavorita[]|null);
    }

    /** Represents a ListarLojasFavoritasResponse. */
    class ListarLojasFavoritasResponse implements IListarLojasFavoritasResponse {

        /**
         * Constructs a new ListarLojasFavoritasResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarLojasFavoritasResponse);

        /** ListarLojasFavoritasResponse favoritas. */
        public favoritas: chickie.ILojaFavorita[];

        /**
         * Creates a new ListarLojasFavoritasResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarLojasFavoritasResponse instance
         */
        public static create(properties?: chickie.IListarLojasFavoritasResponse): chickie.ListarLojasFavoritasResponse;

        /**
         * Encodes the specified ListarLojasFavoritasResponse message. Does not implicitly {@link chickie.ListarLojasFavoritasResponse.verify|verify} messages.
         * @param message ListarLojasFavoritasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarLojasFavoritasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarLojasFavoritasResponse message, length delimited. Does not implicitly {@link chickie.ListarLojasFavoritasResponse.verify|verify} messages.
         * @param message ListarLojasFavoritasResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarLojasFavoritasResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarLojasFavoritasResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarLojasFavoritasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarLojasFavoritasResponse;

        /**
         * Decodes a ListarLojasFavoritasResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarLojasFavoritasResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarLojasFavoritasResponse;

        /**
         * Verifies a ListarLojasFavoritasResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarLojasFavoritasResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarLojasFavoritasResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarLojasFavoritasResponse;

        /**
         * Creates a plain object from a ListarLojasFavoritasResponse message. Also converts values to other types if specified.
         * @param message ListarLojasFavoritasResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarLojasFavoritasResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarLojasFavoritasResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarLojasFavoritasResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HorarioFuncionamento. */
    interface IHorarioFuncionamento {

        /** HorarioFuncionamento uuid */
        uuid?: (string|null);

        /** HorarioFuncionamento loja_uuid */
        loja_uuid?: (string|null);

        /** HorarioFuncionamento dia_semana */
        dia_semana?: (number|null);

        /** HorarioFuncionamento abertura */
        abertura?: (string|null);

        /** HorarioFuncionamento fechamento */
        fechamento?: (string|null);

        /** HorarioFuncionamento ativo */
        ativo?: (boolean|null);

        /** HorarioFuncionamento criado_em */
        criado_em?: (string|null);
    }

    /** Represents a HorarioFuncionamento. */
    class HorarioFuncionamento implements IHorarioFuncionamento {

        /**
         * Constructs a new HorarioFuncionamento.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IHorarioFuncionamento);

        /** HorarioFuncionamento uuid. */
        public uuid: string;

        /** HorarioFuncionamento loja_uuid. */
        public loja_uuid: string;

        /** HorarioFuncionamento dia_semana. */
        public dia_semana: number;

        /** HorarioFuncionamento abertura. */
        public abertura: string;

        /** HorarioFuncionamento fechamento. */
        public fechamento: string;

        /** HorarioFuncionamento ativo. */
        public ativo: boolean;

        /** HorarioFuncionamento criado_em. */
        public criado_em: string;

        /**
         * Creates a new HorarioFuncionamento instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HorarioFuncionamento instance
         */
        public static create(properties?: chickie.IHorarioFuncionamento): chickie.HorarioFuncionamento;

        /**
         * Encodes the specified HorarioFuncionamento message. Does not implicitly {@link chickie.HorarioFuncionamento.verify|verify} messages.
         * @param message HorarioFuncionamento message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IHorarioFuncionamento, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HorarioFuncionamento message, length delimited. Does not implicitly {@link chickie.HorarioFuncionamento.verify|verify} messages.
         * @param message HorarioFuncionamento message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IHorarioFuncionamento, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HorarioFuncionamento message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HorarioFuncionamento
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.HorarioFuncionamento;

        /**
         * Decodes a HorarioFuncionamento message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HorarioFuncionamento
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.HorarioFuncionamento;

        /**
         * Verifies a HorarioFuncionamento message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HorarioFuncionamento message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HorarioFuncionamento
         */
        public static fromObject(object: { [k: string]: any }): chickie.HorarioFuncionamento;

        /**
         * Creates a plain object from a HorarioFuncionamento message. Also converts values to other types if specified.
         * @param message HorarioFuncionamento
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.HorarioFuncionamento, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HorarioFuncionamento to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HorarioFuncionamento
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarHorariosResponse. */
    interface IListarHorariosResponse {

        /** ListarHorariosResponse horarios */
        horarios?: (chickie.IHorarioFuncionamento[]|null);
    }

    /** Represents a ListarHorariosResponse. */
    class ListarHorariosResponse implements IListarHorariosResponse {

        /**
         * Constructs a new ListarHorariosResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarHorariosResponse);

        /** ListarHorariosResponse horarios. */
        public horarios: chickie.IHorarioFuncionamento[];

        /**
         * Creates a new ListarHorariosResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarHorariosResponse instance
         */
        public static create(properties?: chickie.IListarHorariosResponse): chickie.ListarHorariosResponse;

        /**
         * Encodes the specified ListarHorariosResponse message. Does not implicitly {@link chickie.ListarHorariosResponse.verify|verify} messages.
         * @param message ListarHorariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarHorariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarHorariosResponse message, length delimited. Does not implicitly {@link chickie.ListarHorariosResponse.verify|verify} messages.
         * @param message ListarHorariosResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarHorariosResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarHorariosResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarHorariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarHorariosResponse;

        /**
         * Decodes a ListarHorariosResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarHorariosResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarHorariosResponse;

        /**
         * Verifies a ListarHorariosResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarHorariosResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarHorariosResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarHorariosResponse;

        /**
         * Creates a plain object from a ListarHorariosResponse message. Also converts values to other types if specified.
         * @param message ListarHorariosResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarHorariosResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarHorariosResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarHorariosResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Ingrediente. */
    interface IIngrediente {

        /** Ingrediente uuid */
        uuid?: (string|null);

        /** Ingrediente loja_uuid */
        loja_uuid?: (string|null);

        /** Ingrediente nome */
        nome?: (string|null);

        /** Ingrediente unidade_medida */
        unidade_medida?: (string|null);

        /** Ingrediente quantidade */
        quantidade?: (string|null);

        /** Ingrediente preco_unitario */
        preco_unitario?: (number|null);

        /** Ingrediente criado_em */
        criado_em?: (string|null);

        /** Ingrediente atualizado_em */
        atualizado_em?: (string|null);
    }

    /** Represents an Ingrediente. */
    class Ingrediente implements IIngrediente {

        /**
         * Constructs a new Ingrediente.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IIngrediente);

        /** Ingrediente uuid. */
        public uuid: string;

        /** Ingrediente loja_uuid. */
        public loja_uuid: string;

        /** Ingrediente nome. */
        public nome: string;

        /** Ingrediente unidade_medida. */
        public unidade_medida: string;

        /** Ingrediente quantidade. */
        public quantidade: string;

        /** Ingrediente preco_unitario. */
        public preco_unitario: number;

        /** Ingrediente criado_em. */
        public criado_em: string;

        /** Ingrediente atualizado_em. */
        public atualizado_em: string;

        /**
         * Creates a new Ingrediente instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ingrediente instance
         */
        public static create(properties?: chickie.IIngrediente): chickie.Ingrediente;

        /**
         * Encodes the specified Ingrediente message. Does not implicitly {@link chickie.Ingrediente.verify|verify} messages.
         * @param message Ingrediente message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IIngrediente, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ingrediente message, length delimited. Does not implicitly {@link chickie.Ingrediente.verify|verify} messages.
         * @param message Ingrediente message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IIngrediente, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Ingrediente message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ingrediente
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.Ingrediente;

        /**
         * Decodes an Ingrediente message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ingrediente
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.Ingrediente;

        /**
         * Verifies an Ingrediente message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Ingrediente message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ingrediente
         */
        public static fromObject(object: { [k: string]: any }): chickie.Ingrediente;

        /**
         * Creates a plain object from an Ingrediente message. Also converts values to other types if specified.
         * @param message Ingrediente
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.Ingrediente, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ingrediente to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Ingrediente
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ListarIngredientesResponse. */
    interface IListarIngredientesResponse {

        /** ListarIngredientesResponse ingredientes */
        ingredientes?: (chickie.IIngrediente[]|null);
    }

    /** Represents a ListarIngredientesResponse. */
    class ListarIngredientesResponse implements IListarIngredientesResponse {

        /**
         * Constructs a new ListarIngredientesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IListarIngredientesResponse);

        /** ListarIngredientesResponse ingredientes. */
        public ingredientes: chickie.IIngrediente[];

        /**
         * Creates a new ListarIngredientesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ListarIngredientesResponse instance
         */
        public static create(properties?: chickie.IListarIngredientesResponse): chickie.ListarIngredientesResponse;

        /**
         * Encodes the specified ListarIngredientesResponse message. Does not implicitly {@link chickie.ListarIngredientesResponse.verify|verify} messages.
         * @param message ListarIngredientesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IListarIngredientesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ListarIngredientesResponse message, length delimited. Does not implicitly {@link chickie.ListarIngredientesResponse.verify|verify} messages.
         * @param message ListarIngredientesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IListarIngredientesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ListarIngredientesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ListarIngredientesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ListarIngredientesResponse;

        /**
         * Decodes a ListarIngredientesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ListarIngredientesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ListarIngredientesResponse;

        /**
         * Verifies a ListarIngredientesResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ListarIngredientesResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ListarIngredientesResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ListarIngredientesResponse;

        /**
         * Creates a plain object from a ListarIngredientesResponse message. Also converts values to other types if specified.
         * @param message ListarIngredientesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ListarIngredientesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ListarIngredientesResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ListarIngredientesResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ConfigPedido. */
    interface IConfigPedido {

        /** ConfigPedido uuid */
        uuid?: (string|null);

        /** ConfigPedido loja_uuid */
        loja_uuid?: (string|null);

        /** ConfigPedido max_partes */
        max_partes?: (number|null);

        /** ConfigPedido tipo_calculo */
        tipo_calculo?: (string|null);

        /** ConfigPedido criado_em */
        criado_em?: (string|null);

        /** ConfigPedido atualizado_em */
        atualizado_em?: (string|null);
    }

    /** Represents a ConfigPedido. */
    class ConfigPedido implements IConfigPedido {

        /**
         * Constructs a new ConfigPedido.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IConfigPedido);

        /** ConfigPedido uuid. */
        public uuid: string;

        /** ConfigPedido loja_uuid. */
        public loja_uuid: string;

        /** ConfigPedido max_partes. */
        public max_partes: number;

        /** ConfigPedido tipo_calculo. */
        public tipo_calculo: string;

        /** ConfigPedido criado_em. */
        public criado_em: string;

        /** ConfigPedido atualizado_em. */
        public atualizado_em: string;

        /**
         * Creates a new ConfigPedido instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConfigPedido instance
         */
        public static create(properties?: chickie.IConfigPedido): chickie.ConfigPedido;

        /**
         * Encodes the specified ConfigPedido message. Does not implicitly {@link chickie.ConfigPedido.verify|verify} messages.
         * @param message ConfigPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IConfigPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConfigPedido message, length delimited. Does not implicitly {@link chickie.ConfigPedido.verify|verify} messages.
         * @param message ConfigPedido message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IConfigPedido, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConfigPedido message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConfigPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ConfigPedido;

        /**
         * Decodes a ConfigPedido message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConfigPedido
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ConfigPedido;

        /**
         * Verifies a ConfigPedido message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConfigPedido message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConfigPedido
         */
        public static fromObject(object: { [k: string]: any }): chickie.ConfigPedido;

        /**
         * Creates a plain object from a ConfigPedido message. Also converts values to other types if specified.
         * @param message ConfigPedido
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ConfigPedido, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConfigPedido to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ConfigPedido
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LoginResponse. */
    interface ILoginResponse {

        /** LoginResponse access_token */
        access_token?: (string|null);

        /** LoginResponse token_type */
        token_type?: (string|null);

        /** LoginResponse usuario */
        usuario?: (chickie.IUsuario|null);
    }

    /** Represents a LoginResponse. */
    class LoginResponse implements ILoginResponse {

        /**
         * Constructs a new LoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ILoginResponse);

        /** LoginResponse access_token. */
        public access_token: string;

        /** LoginResponse token_type. */
        public token_type: string;

        /** LoginResponse usuario. */
        public usuario?: (chickie.IUsuario|null);

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResponse instance
         */
        public static create(properties?: chickie.ILoginResponse): chickie.LoginResponse;

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link chickie.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link chickie.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.LoginResponse;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.LoginResponse;

        /**
         * Verifies a LoginResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.LoginResponse;

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @param message LoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LoginResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GenericResponse. */
    interface IGenericResponse {

        /** GenericResponse message */
        message?: (string|null);

        /** GenericResponse success */
        success?: (boolean|null);
    }

    /** Represents a GenericResponse. */
    class GenericResponse implements IGenericResponse {

        /**
         * Constructs a new GenericResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IGenericResponse);

        /** GenericResponse message. */
        public message: string;

        /** GenericResponse success. */
        public success: boolean;

        /**
         * Creates a new GenericResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GenericResponse instance
         */
        public static create(properties?: chickie.IGenericResponse): chickie.GenericResponse;

        /**
         * Encodes the specified GenericResponse message. Does not implicitly {@link chickie.GenericResponse.verify|verify} messages.
         * @param message GenericResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IGenericResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GenericResponse message, length delimited. Does not implicitly {@link chickie.GenericResponse.verify|verify} messages.
         * @param message GenericResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IGenericResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GenericResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GenericResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.GenericResponse;

        /**
         * Decodes a GenericResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GenericResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.GenericResponse;

        /**
         * Verifies a GenericResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GenericResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GenericResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.GenericResponse;

        /**
         * Creates a plain object from a GenericResponse message. Also converts values to other types if specified.
         * @param message GenericResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.GenericResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GenericResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GenericResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UuidResponse. */
    interface IUuidResponse {

        /** UuidResponse uuid */
        uuid?: (string|null);
    }

    /** Represents an UuidResponse. */
    class UuidResponse implements IUuidResponse {

        /**
         * Constructs a new UuidResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IUuidResponse);

        /** UuidResponse uuid. */
        public uuid: string;

        /**
         * Creates a new UuidResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UuidResponse instance
         */
        public static create(properties?: chickie.IUuidResponse): chickie.UuidResponse;

        /**
         * Encodes the specified UuidResponse message. Does not implicitly {@link chickie.UuidResponse.verify|verify} messages.
         * @param message UuidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IUuidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UuidResponse message, length delimited. Does not implicitly {@link chickie.UuidResponse.verify|verify} messages.
         * @param message UuidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IUuidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UuidResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UuidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.UuidResponse;

        /**
         * Decodes an UuidResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UuidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.UuidResponse;

        /**
         * Verifies an UuidResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UuidResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UuidResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.UuidResponse;

        /**
         * Creates a plain object from an UuidResponse message. Also converts values to other types if specified.
         * @param message UuidResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.UuidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UuidResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UuidResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DisponibilidadeResponse. */
    interface IDisponibilidadeResponse {

        /** DisponibilidadeResponse disponivel */
        disponivel?: (boolean|null);

        /** DisponibilidadeResponse favorita */
        favorita?: (boolean|null);
    }

    /** Represents a DisponibilidadeResponse. */
    class DisponibilidadeResponse implements IDisponibilidadeResponse {

        /**
         * Constructs a new DisponibilidadeResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IDisponibilidadeResponse);

        /** DisponibilidadeResponse disponivel. */
        public disponivel: boolean;

        /** DisponibilidadeResponse favorita. */
        public favorita: boolean;

        /**
         * Creates a new DisponibilidadeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DisponibilidadeResponse instance
         */
        public static create(properties?: chickie.IDisponibilidadeResponse): chickie.DisponibilidadeResponse;

        /**
         * Encodes the specified DisponibilidadeResponse message. Does not implicitly {@link chickie.DisponibilidadeResponse.verify|verify} messages.
         * @param message DisponibilidadeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IDisponibilidadeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DisponibilidadeResponse message, length delimited. Does not implicitly {@link chickie.DisponibilidadeResponse.verify|verify} messages.
         * @param message DisponibilidadeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IDisponibilidadeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DisponibilidadeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DisponibilidadeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.DisponibilidadeResponse;

        /**
         * Decodes a DisponibilidadeResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DisponibilidadeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.DisponibilidadeResponse;

        /**
         * Verifies a DisponibilidadeResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DisponibilidadeResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DisponibilidadeResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.DisponibilidadeResponse;

        /**
         * Creates a plain object from a DisponibilidadeResponse message. Also converts values to other types if specified.
         * @param message DisponibilidadeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.DisponibilidadeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DisponibilidadeResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DisponibilidadeResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SlugDisponivelResponse. */
    interface ISlugDisponivelResponse {

        /** SlugDisponivelResponse disponivel */
        disponivel?: (boolean|null);

        /** SlugDisponivelResponse slug */
        slug?: (string|null);
    }

    /** Represents a SlugDisponivelResponse. */
    class SlugDisponivelResponse implements ISlugDisponivelResponse {

        /**
         * Constructs a new SlugDisponivelResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ISlugDisponivelResponse);

        /** SlugDisponivelResponse disponivel. */
        public disponivel: boolean;

        /** SlugDisponivelResponse slug. */
        public slug: string;

        /**
         * Creates a new SlugDisponivelResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SlugDisponivelResponse instance
         */
        public static create(properties?: chickie.ISlugDisponivelResponse): chickie.SlugDisponivelResponse;

        /**
         * Encodes the specified SlugDisponivelResponse message. Does not implicitly {@link chickie.SlugDisponivelResponse.verify|verify} messages.
         * @param message SlugDisponivelResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ISlugDisponivelResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SlugDisponivelResponse message, length delimited. Does not implicitly {@link chickie.SlugDisponivelResponse.verify|verify} messages.
         * @param message SlugDisponivelResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ISlugDisponivelResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SlugDisponivelResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SlugDisponivelResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.SlugDisponivelResponse;

        /**
         * Decodes a SlugDisponivelResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SlugDisponivelResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.SlugDisponivelResponse;

        /**
         * Verifies a SlugDisponivelResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SlugDisponivelResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SlugDisponivelResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.SlugDisponivelResponse;

        /**
         * Creates a plain object from a SlugDisponivelResponse message. Also converts values to other types if specified.
         * @param message SlugDisponivelResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.SlugDisponivelResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SlugDisponivelResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SlugDisponivelResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PedidoStatusResponse. */
    interface IPedidoStatusResponse {

        /** PedidoStatusResponse uuid */
        uuid?: (string|null);

        /** PedidoStatusResponse status */
        status?: (string|null);

        /** PedidoStatusResponse transicoes_permitidas */
        transicoes_permitidas?: (string[]|null);
    }

    /** Represents a PedidoStatusResponse. */
    class PedidoStatusResponse implements IPedidoStatusResponse {

        /**
         * Constructs a new PedidoStatusResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IPedidoStatusResponse);

        /** PedidoStatusResponse uuid. */
        public uuid: string;

        /** PedidoStatusResponse status. */
        public status: string;

        /** PedidoStatusResponse transicoes_permitidas. */
        public transicoes_permitidas: string[];

        /**
         * Creates a new PedidoStatusResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PedidoStatusResponse instance
         */
        public static create(properties?: chickie.IPedidoStatusResponse): chickie.PedidoStatusResponse;

        /**
         * Encodes the specified PedidoStatusResponse message. Does not implicitly {@link chickie.PedidoStatusResponse.verify|verify} messages.
         * @param message PedidoStatusResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IPedidoStatusResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PedidoStatusResponse message, length delimited. Does not implicitly {@link chickie.PedidoStatusResponse.verify|verify} messages.
         * @param message PedidoStatusResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IPedidoStatusResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PedidoStatusResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PedidoStatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.PedidoStatusResponse;

        /**
         * Decodes a PedidoStatusResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PedidoStatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.PedidoStatusResponse;

        /**
         * Verifies a PedidoStatusResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PedidoStatusResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PedidoStatusResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.PedidoStatusResponse;

        /**
         * Creates a plain object from a PedidoStatusResponse message. Also converts values to other types if specified.
         * @param message PedidoStatusResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.PedidoStatusResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PedidoStatusResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PedidoStatusResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PedidoComEntregaResponse. */
    interface IPedidoComEntregaResponse {

        /** PedidoComEntregaResponse pedido */
        pedido?: (chickie.IPedido|null);

        /** PedidoComEntregaResponse endereco_entrega */
        endereco_entrega?: (chickie.IEndereco|null);
    }

    /** Represents a PedidoComEntregaResponse. */
    class PedidoComEntregaResponse implements IPedidoComEntregaResponse {

        /**
         * Constructs a new PedidoComEntregaResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IPedidoComEntregaResponse);

        /** PedidoComEntregaResponse pedido. */
        public pedido?: (chickie.IPedido|null);

        /** PedidoComEntregaResponse endereco_entrega. */
        public endereco_entrega?: (chickie.IEndereco|null);

        /**
         * Creates a new PedidoComEntregaResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PedidoComEntregaResponse instance
         */
        public static create(properties?: chickie.IPedidoComEntregaResponse): chickie.PedidoComEntregaResponse;

        /**
         * Encodes the specified PedidoComEntregaResponse message. Does not implicitly {@link chickie.PedidoComEntregaResponse.verify|verify} messages.
         * @param message PedidoComEntregaResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IPedidoComEntregaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PedidoComEntregaResponse message, length delimited. Does not implicitly {@link chickie.PedidoComEntregaResponse.verify|verify} messages.
         * @param message PedidoComEntregaResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IPedidoComEntregaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PedidoComEntregaResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PedidoComEntregaResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.PedidoComEntregaResponse;

        /**
         * Decodes a PedidoComEntregaResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PedidoComEntregaResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.PedidoComEntregaResponse;

        /**
         * Verifies a PedidoComEntregaResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PedidoComEntregaResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PedidoComEntregaResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.PedidoComEntregaResponse;

        /**
         * Creates a plain object from a PedidoComEntregaResponse message. Also converts values to other types if specified.
         * @param message PedidoComEntregaResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.PedidoComEntregaResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PedidoComEntregaResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PedidoComEntregaResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PedidoComEntregadorResponse. */
    interface IPedidoComEntregadorResponse {

        /** PedidoComEntregadorResponse pedido */
        pedido?: (chickie.IPedido|null);

        /** PedidoComEntregadorResponse entregador_nome */
        entregador_nome?: (string|null);

        /** PedidoComEntregadorResponse veiculo */
        veiculo?: (string|null);

        /** PedidoComEntregadorResponse placa */
        placa?: (string|null);
    }

    /** Represents a PedidoComEntregadorResponse. */
    class PedidoComEntregadorResponse implements IPedidoComEntregadorResponse {

        /**
         * Constructs a new PedidoComEntregadorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IPedidoComEntregadorResponse);

        /** PedidoComEntregadorResponse pedido. */
        public pedido?: (chickie.IPedido|null);

        /** PedidoComEntregadorResponse entregador_nome. */
        public entregador_nome: string;

        /** PedidoComEntregadorResponse veiculo. */
        public veiculo: string;

        /** PedidoComEntregadorResponse placa. */
        public placa: string;

        /**
         * Creates a new PedidoComEntregadorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PedidoComEntregadorResponse instance
         */
        public static create(properties?: chickie.IPedidoComEntregadorResponse): chickie.PedidoComEntregadorResponse;

        /**
         * Encodes the specified PedidoComEntregadorResponse message. Does not implicitly {@link chickie.PedidoComEntregadorResponse.verify|verify} messages.
         * @param message PedidoComEntregadorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IPedidoComEntregadorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PedidoComEntregadorResponse message, length delimited. Does not implicitly {@link chickie.PedidoComEntregadorResponse.verify|verify} messages.
         * @param message PedidoComEntregadorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IPedidoComEntregadorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PedidoComEntregadorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PedidoComEntregadorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.PedidoComEntregadorResponse;

        /**
         * Decodes a PedidoComEntregadorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PedidoComEntregadorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.PedidoComEntregadorResponse;

        /**
         * Verifies a PedidoComEntregadorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PedidoComEntregadorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PedidoComEntregadorResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.PedidoComEntregadorResponse;

        /**
         * Creates a plain object from a PedidoComEntregadorResponse message. Also converts values to other types if specified.
         * @param message PedidoComEntregadorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.PedidoComEntregadorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PedidoComEntregadorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PedidoComEntregadorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SubirImagemResponse. */
    interface ISubirImagemResponse {

        /** SubirImagemResponse uuid */
        uuid?: (string|null);

        /** SubirImagemResponse imagem_url */
        imagem_url?: (string|null);

        /** SubirImagemResponse message */
        message?: (string|null);
    }

    /** Represents a SubirImagemResponse. */
    class SubirImagemResponse implements ISubirImagemResponse {

        /**
         * Constructs a new SubirImagemResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.ISubirImagemResponse);

        /** SubirImagemResponse uuid. */
        public uuid: string;

        /** SubirImagemResponse imagem_url. */
        public imagem_url: string;

        /** SubirImagemResponse message. */
        public message: string;

        /**
         * Creates a new SubirImagemResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubirImagemResponse instance
         */
        public static create(properties?: chickie.ISubirImagemResponse): chickie.SubirImagemResponse;

        /**
         * Encodes the specified SubirImagemResponse message. Does not implicitly {@link chickie.SubirImagemResponse.verify|verify} messages.
         * @param message SubirImagemResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.ISubirImagemResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubirImagemResponse message, length delimited. Does not implicitly {@link chickie.SubirImagemResponse.verify|verify} messages.
         * @param message SubirImagemResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.ISubirImagemResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubirImagemResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SubirImagemResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.SubirImagemResponse;

        /**
         * Decodes a SubirImagemResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SubirImagemResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.SubirImagemResponse;

        /**
         * Verifies a SubirImagemResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubirImagemResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubirImagemResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.SubirImagemResponse;

        /**
         * Creates a plain object from a SubirImagemResponse message. Also converts values to other types if specified.
         * @param message SubirImagemResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.SubirImagemResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubirImagemResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SubirImagemResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ErrorResponse. */
    interface IErrorResponse {

        /** ErrorResponse error */
        error?: (string|null);

        /** ErrorResponse status */
        status?: (number|null);
    }

    /** Represents an ErrorResponse. */
    class ErrorResponse implements IErrorResponse {

        /**
         * Constructs a new ErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chickie.IErrorResponse);

        /** ErrorResponse error. */
        public error: string;

        /** ErrorResponse status. */
        public status: number;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        public static create(properties?: chickie.IErrorResponse): chickie.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link chickie.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chickie.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link chickie.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chickie.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chickie.ErrorResponse;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chickie.ErrorResponse;

        /**
         * Verifies an ErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorResponse
         */
        public static fromObject(object: { [k: string]: any }): chickie.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chickie.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
