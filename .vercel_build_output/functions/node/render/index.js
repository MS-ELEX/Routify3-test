var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key2 of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key2) && key2 !== "default")
        __defProp(target, key2, { get: () => module2[key2], enumerable: !(desc = __getOwnPropDesc(module2, key2)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_fs = __toModule(require("fs"));
    import_node_path = __toModule(require("path"));
    import_node_worker_threads = __toModule(require("worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("http"));
    import_node_https = __toModule(require("https"));
    import_node_zlib = __toModule(require("zlib"));
    import_node_stream = __toModule(require("stream"));
    import_node_util = __toModule(require("util"));
    import_node_url = __toModule(require("url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta2 = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta2[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta2.length; i2++) {
    if (meta2[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta2[i2]}`;
      if (meta2[i2].indexOf("charset=") === 0) {
        charset = meta2[i2].substring(8);
      }
    }
  }
  if (!meta2[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone3 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone3) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url2, originOnly = false) {
  if (url2 == null) {
    return "no-referrer";
  }
  url2 = new URL(url2);
  if (/^(about|blob|data):$/.test(url2.protocol)) {
    return "no-referrer";
  }
  url2.username = "";
  url2.password = "";
  url2.hash = "";
  if (originOnly) {
    url2.pathname = "";
    url2.search = "";
  }
  return url2;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url2) {
  if (/^(http|ws)s:$/.test(url2.protocol)) {
    return true;
  }
  const hostIp = url2.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url2.host)) {
    return false;
  }
  if (url2.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url2) {
  if (/^about:(blank|srcdoc)$/.test(url2)) {
    return true;
  }
  if (url2.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url2.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url2);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url2, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url2, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url2}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function __fetch_polyfill() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http2 = __toModule(require("http"));
    import_node_https2 = __toModule(require("https"));
    import_node_zlib2 = __toModule(require("zlib"));
    import_node_stream2 = __toModule(require("stream"));
    import_node_util2 = __toModule(require("util"));
    import_node_url2 = __toModule(require("url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals2 = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals2 && globals2.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node2 = this._front;
            let elements = node2._elements;
            while (i2 !== elements.length || node2._next !== void 0) {
              if (i2 === elements.length) {
                node2 = node2._next;
                elements = node2._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context2) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context2} is not an object.`);
          }
        }
        function assertFunction(x2, context2) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context2} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context2) {
          if (!isObject(x2)) {
            throw new TypeError(`${context2} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context2) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context2}'.`);
          }
        }
        function assertRequiredField(x2, field, context2) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context2}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context2) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context2} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context2} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context2) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context2} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry4 = this._queue.shift();
              this._queueTotalSize -= entry4.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry4.buffer, entry4.byteOffset, entry4.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context2) {
          assertDictionary(init2, context2);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context2} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context2) {
          assertFunction(fn, context2);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context2) {
          assertDictionary(original, context2);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context2} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context2} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context2} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context2} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context2) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context2} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context2) {
          assertDictionary(source, context2);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context2} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context2} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context2} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context2} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context2} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context2) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context2} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context2) {
          assertDictionary(options, context2);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context2} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context2) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context2} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context2) {
          assertDictionary(options, context2);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context2) {
          assertDictionary(options, context2);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context2} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context2) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context2} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context2) {
          assertDictionary(pair, context2);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context2} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context2} has member 'writable' that`);
          return { readable: readable2, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context2) {
          assertDictionary(init2, context2);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context2) {
          assertDictionary(original, context2);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context2} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context2} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context2} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context2) {
          assertFunction(fn, context2);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util2.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url2, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url2).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-1abd510b.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context2) {
  get_current_component().$$.context.set(key2, context2);
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context2) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context2 || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context: context2 = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context2);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css9) => css9.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var current_component, globals, boolean_attributes, escaped, missing_component, on_destroy;
var init_index_1abd510b = __esm({
  ".svelte-kit/output/server/chunks/index-1abd510b.js"() {
    Promise.resolve();
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    boolean_attributes = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/entries/pages/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/layout.svelte.js"() {
    init_index_1abd510b();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "layout.svelte-c445a8ce.js";
    js = ["layout.svelte-c445a8ce.js", "chunks/vendor-78f63506.js"];
    css = [];
  }
});

// .svelte-kit/output/server/entries/pages/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/error.svelte.js"() {
    init_index_1abd510b();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-8a22eb3a.js";
    js2 = ["error.svelte-8a22eb3a.js", "chunks/vendor-78f63506.js"];
    css2 = [];
  }
});

// .svelte-kit/output/server/chunks/index-e25a1ff5.js
var getMRCA, getPath, url, inheritedParams, isActive, isActiveRoute, isActiveUrl, pseudoStore, context, node, meta, pendingRoute;
var init_index_e25a1ff5 = __esm({
  ".svelte-kit/output/server/chunks/index-e25a1ff5.js"() {
    init_index_1b88065c();
    init_index_1abd510b();
    getMRCA = (node1, node2) => {
      const lineage1 = [node1, ...node1.ancestors];
      const lineage2 = [node2, ...node2.ancestors];
      return lineage1.find((node3) => lineage2.includes(node3));
    };
    getPath = (node1, node2) => {
      const lineage1 = [node1, ...node1.ancestors];
      const lineage2 = [node2, ...node2.ancestors];
      const mrca = getMRCA(node1, node2);
      const backtrackSteps = lineage1.indexOf(mrca);
      const backtrackStr = backtrackSteps ? "../".repeat(backtrackSteps) : "";
      const forwardSteps = lineage2.indexOf(mrca);
      const forwardStepsStr = lineage2.slice(0, forwardSteps).reverse().map((n) => n.name).join("/");
      return backtrackStr + forwardStepsStr;
    };
    url = {
      subscribe: (run2, invalidate) => {
        const { router: router2 } = contexts;
        const originalOriginNode = contexts.fragment.node;
        return derived(router2.activeRoute, (activeRoute) => {
          const originNode = router2.rootNode.traverse(originalOriginNode.path);
          return (inputPath, userParams = {}) => {
            const offset = inputPath.startsWith("/") ? router2.rootNode.path : "";
            const targetNode = originNode.traverse(offset + inputPath);
            if (!targetNode) {
              console.error("could not find destination node", inputPath);
              return;
            }
            const mrca = getMRCA(targetNode, router2.rootNode);
            const path = "/" + getPath(mrca, targetNode);
            const params = __spreadValues(__spreadValues({}, inheritedParams(targetNode, activeRoute)), userParams);
            const internalUrl = populateUrl(path, params, activeRoute);
            return router2.getExternalUrl(internalUrl);
          };
        }).subscribe(run2, invalidate);
      }
    };
    inheritedParams = (node2, route) => {
      const lineage = [node2, ...node2.ancestors].reverse();
      const params = lineage.map((_node) => {
        var _a4;
        return (_a4 = route.allFragments.find((fragment) => fragment.node === _node || fragment.node.path === _node.path)) == null ? void 0 : _a4.params;
      });
      return Object.assign({}, ...params);
    };
    isActive = {
      subscribe: (run2, invalidate) => derived(contexts.router.activeRoute, isActiveRoute).subscribe(run2, invalidate)
    };
    isActiveRoute = ($route) => isActiveUrl($route.url);
    isActiveUrl = (url2) => (path, params, options = {}) => {
      const { recursive } = __spreadValues({ recursive: true }, options);
      path = pathAndParamsToUrl(path, params, (x2) => "");
      if (recursive)
        path = path.replace(/\/index\/?$/, "");
      return (url2 + "/").startsWith(path + "/");
    };
    pseudoStore = (callback) => ({
      subscribe: (run2) => {
        run2(callback());
        return () => {
        };
      }
    });
    context = pseudoStore(() => contexts.fragment);
    node = pseudoStore(() => get_store_value(context).node);
    meta = pseudoStore(() => get_store_value(node).meta);
    pendingRoute = {
      subscribe: (run2) => contexts.router.pendingRoute.subscribe(run2)
    };
  }
});

// .svelte-kit/output/server/chunks/_navigation-fb8adec4.js
var navigation_fb8adec4_exports = {};
__export(navigation_fb8adec4_exports, {
  default: () => Navigation
});
var css3, Navigation;
var init_navigation_fb8adec4 = __esm({
  ".svelte-kit/output/server/chunks/_navigation-fb8adec4.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
    init_index_e25a1ff5();
    css3 = {
      code: ".container.svelte-dexlqq.svelte-dexlqq{padding:0 40px}.isActive.svelte-dexlqq a.svelte-dexlqq{text-decoration:underline}",
      map: null
    };
    Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let liveUrl;
      let $node, $$unsubscribe_node;
      let $isActive, $$unsubscribe_isActive;
      $$unsubscribe_node = subscribe(node, (value) => $node = value);
      $$unsubscribe_isActive = subscribe(isActive, (value) => $isActive = value);
      let { pages } = $$props;
      if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
        $$bindings.pages(pages);
      $$result.css.add(css3);
      liveUrl = (index) => {
        var _a4, _b;
        return pages && ((_b = (_a4 = pages[index]) == null ? void 0 : _a4.router) == null ? void 0 : _b.url.external());
      };
      $$unsubscribe_node();
      $$unsubscribe_isActive();
      return `<nav class="${"container svelte-dexlqq"}"><ul><li><h1><a href="${"/"}">Portfolio</a></h1></li></ul>
    <ul>${each($node.pages, (childNode, index) => {
        return `<li class="${["svelte-dexlqq", $isActive(childNode.path) ? "isActive" : ""].join(" ").trim()}"><a${add_attribute("href", liveUrl(index) || childNode.path, 0)} class="${"svelte-dexlqq"}">${escape(childNode.meta.title || childNode.name)}</a>
            </li>`;
      })}</ul>
</nav>`;
    });
  }
});

// .svelte-kit/output/server/chunks/_loader-fce8554a.js
var loader_fce8554a_exports = {};
__export(loader_fce8554a_exports, {
  default: () => Loader
});
var css4, Loader;
var init_loader_fce8554a = __esm({
  ".svelte-kit/output/server/chunks/_loader-fce8554a.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
    init_index_e25a1ff5();
    css4 = {
      code: "progress.svelte-1yl4j34{position:fixed}",
      map: null
    };
    Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let value;
      let $pendingRoute, $$unsubscribe_pendingRoute;
      $$unsubscribe_pendingRoute = subscribe(pendingRoute, (value2) => $pendingRoute = value2);
      setInterval(() => value++, 10);
      $$result.css.add(css4);
      value = $pendingRoute && 0;
      $$unsubscribe_pendingRoute();
      return `${$pendingRoute ? `<progress${add_attribute("value", value, 0)} max="${"100"}" class="${"svelte-1yl4j34"}"></progress>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/_module-823b6fcf.js
var module_823b6fcf_exports = {};
__export(module_823b6fcf_exports, {
  default: () => Module
});
var Nested, InlineNav, css5, Module;
var init_module_823b6fcf = __esm({
  ".svelte-kit/output/server/chunks/_module-823b6fcf.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
    init_index_e25a1ff5();
    init_navigation_fb8adec4();
    init_loader_fce8554a();
    Nested = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $context, $$unsubscribe_context;
      $$unsubscribe_context = subscribe(context, (value) => $context = value);
      let { fragments } = $$props;
      fragments = fragments || $context.route.fragments.slice(1);
      if ($$props.fragments === void 0 && $$bindings.fragments && fragments !== void 0)
        $$bindings.fragments(fragments);
      $$unsubscribe_context();
      return `${validate_component(Component, "Component").$$render($$result, { fragments }, {}, {})}`;
    });
    InlineNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $activeRoute, $$unsubscribe_activeRoute;
      let $context, $$unsubscribe_context;
      $$unsubscribe_context = subscribe(context, (value) => $context = value);
      let { parentNode = null } = $$props;
      let { singlePage = null } = $$props;
      const { route, node: node2 } = $context;
      const { activeRoute } = route.router;
      $$unsubscribe_activeRoute = subscribe(activeRoute, (value) => $activeRoute = value);
      let payload;
      singlePage = singlePage || typeof window === "undefined";
      parentNode = parentNode || node2;
      const isActiveNode = (node22) => $activeRoute.allFragments.find((ar) => ar.node === node22);
      const createRouterCmp = (router2) => {
        return function(opts) {
          opts.props = __spreadProps(__spreadValues({}, opts.props), { router: router2 });
          return new Router_1(opts);
        };
      };
      const transformFragments = (fragments) => {
        const cutoff = fragments.findIndex((fragment) => fragment.node.level > parentNode.level);
        return fragments.slice(cutoff);
      };
      const routers = parentNode.pages.map((n) => ({
        rootNode: n,
        router: createRouter({
          transformFragments,
          passthrough: true,
          urlReflector: InternalReflector,
          url: n.path,
          name: n.name
        })
      }));
      const refresh = ($activeRoute2) => {
        const activeSubRouter = routers.find((router2) => isActiveNode(router2.rootNode));
        const clonedRoute = clone2($activeRoute2, { router: activeSubRouter.router });
        activeSubRouter.router.activeRoute.set(clonedRoute);
        payload = {
          index: singlePage ? 0 : routers.indexOf(activeSubRouter),
          pages: !singlePage ? routers.map((page) => ({
            Page: createRouterCmp(page.router),
            router: page.router
          })) : [{ Page: Nested }],
          inBrowser: !singlePage
        };
      };
      if ($$props.parentNode === void 0 && $$bindings.parentNode && parentNode !== void 0)
        $$bindings.parentNode(parentNode);
      if ($$props.singlePage === void 0 && $$bindings.singlePage && singlePage !== void 0)
        $$bindings.singlePage(singlePage);
      {
        refresh($activeRoute);
      }
      $$unsubscribe_activeRoute();
      $$unsubscribe_context();
      return `${!singlePage ? `<div style="${"display: contents"}">${slots.default ? slots.default(__spreadValues({}, payload)) : ``}</div>` : `${slots.default ? slots.default(__spreadValues({}, payload)) : ``}`}`;
    });
    css5 = {
      code: "*{max-height:100%}html,body{overflow:hidden}.container.svelte-1drhydj{transition:transform 0.3s;transform:translateX(calc(-100% * var(--page-index)));display:flex;padding:0 40px}.page.svelte-1drhydj{flex:0 0 100%;margin-right:80px;max-height:calc(100vh - 100px);overflow-y:auto}",
      map: null
    };
    Module = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}
${validate_component(InlineNav, "InlineNav").$$render($$result, {}, {}, {
        default: ({ pages, index }) => {
          return `${validate_component(Navigation, "Navigation").$$render($$result, { pages }, {}, {})}
    <div class="${"container svelte-1drhydj"}" style="${"--page-index: " + escape(index)}">${each(pages, ({ Page, router: router2 }) => {
            return `<div class="${"page svelte-1drhydj"}">${validate_component(Page, "Page").$$render($$result, {}, {}, {})}
            </div>`;
          })}</div>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/chunks/index-af807f66.js
var index_af807f66_exports = {};
__export(index_af807f66_exports, {
  default: () => _1_home
});
var _1_home;
var init_index_af807f66 = __esm({
  ".svelte-kit/output/server/chunks/index-af807f66.js"() {
    init_index_1abd510b();
    _1_home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<header><h1>Svelte Summit 2021</h1></header>`;
    });
  }
});

// .svelte-kit/output/server/chunks/div_align_center_n_i-2054--1ivb1p-4c722558.js
var div_align_center_n_i_2054_1ivb1p_4c722558_exports = {};
__export(div_align_center_n_i_2054_1ivb1p_4c722558_exports, {
  default: () => div_align_center_n_i2054_1ivb1p
});
var div_align_center_n_i2054_1ivb1p;
var init_div_align_center_n_i_2054_1ivb1p_4c722558 = __esm({
  ".svelte-kit/output/server/chunks/div_align_center_n_i-2054--1ivb1p-4c722558.js"() {
    div_align_center_n_i2054_1ivb1p = '<div align="center">\n    <img src="https://github.com/roxiness/routify/raw/master/routify.png" alt="routify" width="512" /><br>\n    <img src="https://badgen.net/npm/v/@roxi/routify" alt="Badge" />\n</div> \n\n\n<hr>\n<h2 id="install">Install</h2>\n<ul>\n<li>Install the Router only: <code>npm install --save-dev @roxi/routify</code></li>\n<li>Clone the <a href="https://github.com/roxiness/routify-starter">starter template</a>:<ul>\n<li><code>npx @roxi/routify init</code></li>\n<li>The starter template contains a lot more than just the router, for more info see <a href="https://routify.dev/guide/starter-Template">here</a>.</li>\n</ul>\n</li>\n</ul>\n<h2 id="documentation">Documentation</h2>\n<p><a href="https://routify.dev/guide/introduction">routify.dev</a></p>\n<h2 id="template">Template</h2>\n<p><a href="https://github.com/roxiness/routify-starter">Routify starter template</a>\nIncludes SSR, prerendering, code splitting and much more.</p>\n<h2 id="example">Example</h2>\n<p><a href="https://example.routify.dev/example">Starter example</a> Example from the starter template. Refresh a page to see how it is loaded.</p>\n<h2 id="tutorials">Tutorials</h2>\n<ul>\n<li><a href="https://www.youtube.com/watch?v=AGLUJlOC6f0">Easy client-side SPA routing with Routify</a> by Jitesh</li>\n<li><a href="https://johanronsse.be/2020/05/01/how-to-add-postcss-to-routify/">How to add PostSCSS to Routify Starter</a> by Wolfr</li>\n<li><a href="https://johanronsse.be/2020/04/05/how-to-add-scss-to-a-svelte-project-using-routify/">Add SCSS to a Routify project</a> by Wolfr (slightly outdated)</li>\n</ul>\n<h2 id="support">Support</h2>\n<p>Please feel free to open an issue or a pull request. All feedback is welcome.</p>\n<p><img height="32px" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" /> <strong>Join us on Discord</strong> </p>\n<p>Want help? Have ideas about Routify? Chat with us on Discord. \n<a href="https://discord.gg/ntKJD5B">https://discord.gg/ntKJD5B</a></p>\n';
  }
});

// .svelte-kit/output/server/chunks/div_align_center_n_i-6042-f6acgr-110eaebd.js
var div_align_center_n_i_6042_f6acgr_110eaebd_exports = {};
__export(div_align_center_n_i_6042_f6acgr_110eaebd_exports, {
  default: () => div_align_center_n_i6042F6acgr
});
var div_align_center_n_i6042F6acgr;
var init_div_align_center_n_i_6042_f6acgr_110eaebd = __esm({
  ".svelte-kit/output/server/chunks/div_align_center_n_i-6042-f6acgr-110eaebd.js"() {
    div_align_center_n_i6042F6acgr = '<div align="center">\n<img src="https://github.com/roxiness/configent/raw/master/configent.png" alt="configent">\n</div>\n\n<h1 id="configent">Configent</h1>\n<h3 id="confident-configurations">Confident configurations</h3>\n<p>No fuzz config compilation from (ordered by ascending precedence)</p>\n<ul>\n<li>defaults</li>\n<li>package.json</li>\n<li>[name].config.js</li>\n<li>.env</li>\n<li>environment</li>\n<li>input</li>\n</ul>\n<pre><code class="language-javascript">/** \n * package.json {&quot;foobar&quot;: {&quot;city&quot;: &quot;Portsmouth&quot;}}\n * foobar.config.js {lastSeen: &#39;Liverpool&#39;}\n * process.env.foobar_last_seen = London\n * options = { name: &#39;Sherlock Holmes&#39; }\n*/\n\nconst defaults = { name: &#39;John Doe&#39;, city: &#39;N/A&#39;, lastSeen: &#39;N/A&#39; }\n\nconst config = configent(&#39;foobar&#39;, defaults, options)\n\n/**\n * console.log(config)\n * {\n *   name: &#39;Sherlock Holmes&#39;,\n *   city: &#39;Portsmouth&#39;,\n *   lastSeen: &#39;London&#39;  \n * }\n * /\n</code></pre>\n<h3 id="auto-detect-defaults">Auto detect defaults</h3>\n<p>Configent supports multiple default configs. These are added to <code>./configs</code>.</p>\n<pre><code class="language-javascript">/** ./configs/routify2.config.js */\n\nmodule.exports = {\n    supersedes: [&#39;svelte&#39;],\n    condition: ({ pkgjson }) =&gt; pkgjson.dependencies[&#39;@roxi/routify&#39;],\n    config: () =&gt; ({ \n        /** the config object used as default */\n        myAppName: &#39;Routify App&#39; \n    })\n}\n</code></pre>\n<pre><code class="language-javascript">/** ./configs/svelte.config.js */\n\nmodule.exports = {\n    condition: ({ pkgjson }) =&gt; pkgjson.dependencies[&#39;svelte&#39;],\n    config: () =&gt; ({ \n        /** the config object used as default */\n        myAppName: &#39;Svelte App&#39; \n    })\n}\n</code></pre>\n<p>The first config with a true condition is used. To avoid conflicts, configs using the  <code>supersedes</code> option, will run before their superseded targets.</p>\n<p>To change the location of default configs, refer to <code>detectDefaultsConfigPath</code>.</p>\n<h3 id="api">API</h3>\n<!-- Generated by documentation.js. Update this documentation by updating the source code. -->\n\n<h5 id="table-of-contents">Table of Contents</h5>\n<ul>\n<li><a href="#configent">configent</a><ul>\n<li><a href="#parameters">Parameters</a></li>\n</ul>\n</li>\n</ul>\n<h4 id="configent-1">configent</h4>\n<h5 id="parameters">Parameters</h5>\n<ul>\n<li><code>defaults</code> <strong>options</strong> default options</li>\n<li><code>input</code> <strong>Partial&lt;options&gt;?</strong> provided input (optional, default <code>{}</code>)</li>\n<li><code>configentOptions</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>?</strong> configent options<ul>\n<li><code>configentOptions.name</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> name to use for configs. If left empty, name from package.json is used (optional, default <code>&#39;&#39;</code>)</li>\n<li><code>configentOptions.cacheConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> calling configent twice with same parameters will return the same instance (optional, default <code>true</code>)</li>\n<li><code>configentOptions.cacheDetectedDefaults</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> calling configent twice from the same module will return the same defaults (optional, default <code>true</code>)</li>\n<li><code>configentOptions.useDotEnv</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from .env files (optional, default <code>true</code>)</li>\n<li><code>configentOptions.useEnv</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from process.env (optional, default <code>true</code>)</li>\n<li><code>configentOptions.usePackageConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from package.json (optional, default <code>true</code>)</li>\n<li><code>configentOptions.useConfig</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> include config from [name].config.js (optional, default <code>true</code>)</li>\n<li><code>configentOptions.useDetectDefaults</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> detect defaults from context (package.json and file stucture) (optional, default <code>true</code>)</li>\n<li><code>configentOptions.detectDefaultsConfigPath</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> detect defaults from context (package.json and file stucture) (optional, default <code>&#39;configs&#39;</code>)</li>\n<li><code>configentOptions.sanitizeEnvValue</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></strong> sanitize environment values. Convert snake_case to camelCase by default. (optional, default <code>str=&gt;str.replace(/[-_][a-z]/g,str=&gt;str.substr(1).toUpperCase())</code>)</li>\n<li><code>configentOptions.module</code> <strong>NodeModule?</strong> required if multiple modules are using configent</li>\n</ul>\n</li>\n</ul>\n<p>Returns <strong>options</strong> </p>\n<h4 id=""></h4>\n<hr>\n<p><a href="https://www.freepik.com/vectors/vintage">Vintage vector created by macrovector - www.freepik.com</a></p>\n';
  }
});

// .svelte-kit/output/server/chunks/div_align_center_n_i-4921--kzwpwn-7bc26563.js
var div_align_center_n_i_4921_kzwpwn_7bc26563_exports = {};
__export(div_align_center_n_i_4921_kzwpwn_7bc26563_exports, {
  default: () => div_align_center_n_i4921_Kzwpwn
});
var div_align_center_n_i4921_Kzwpwn;
var init_div_align_center_n_i_4921_kzwpwn_7bc26563 = __esm({
  ".svelte-kit/output/server/chunks/div_align_center_n_i-4921--kzwpwn-7bc26563.js"() {
    div_align_center_n_i4921_Kzwpwn = '<div align="center">\n    <img src="https://github.com/roxiness/tossr/raw/master/tossr_logo.svg" alt="tossr" width="300" /><br>\n</div>\n\n<h3 id="universal-spa-to-ssr">Universal SPA to SSR</h3>\n<p>Render HTML from any SPA.</p>\n<h3 id="install">Install</h3>\n<p><code>npm i tossr</code></p>\n<h3 id="usage-example">Usage example</h3>\n<pre><code class="language-javascript">const { tossr } = require(&#39;tossr&#39;)\n\nconst template = &#39;dist/index.html&#39;\nconst script = &#39;dist/app.js&#39;\nconst url = &#39;/blog/ssr-is-fun&#39;\n\nconst html = await tossr(template, script, url)\n</code></pre>\n<h3 id="related-libraries">Related libraries</h3>\n<ul>\n<li><a href="https://github.com/roxiness/spassr">Spassr</a> Small Express server with built in SSR</li>\n<li><a href="https://github.com/roxiness/spank">Spank</a> Generate a static site from any SPA</li>\n</ul>\n<hr>\n<h3 id="api">API</h3>\n<!-- Generated by documentation.js. Update this documentation by updating the source code. -->\n\n<h5 id="table-of-contents">Table of Contents</h5>\n<ul>\n<li><a href="#tossr">tossr</a><ul>\n<li><a href="#parameters">Parameters</a></li>\n</ul>\n</li>\n<li><a href="#config">Config</a><ul>\n<li><a href="#properties">Properties</a></li>\n</ul>\n</li>\n<li><a href="#eval">Eval</a><ul>\n<li><a href="#parameters-1">Parameters</a></li>\n</ul>\n</li>\n</ul>\n<h4 id="tossr">tossr</h4>\n<p>Renders an HTML page from a HTML template, an app bundle and a path</p>\n<h5 id="parameters">Parameters</h5>\n<ul>\n<li><code>template</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> Html template (or path to a HTML template).</li>\n<li><code>script</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> Bundled JS app (or path to bundled bundle JS app).</li>\n<li><code>url</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> Path to render. Ie. /blog/breathing-oxygen-linked-to-staying-alive</li>\n<li><code>options</code> <strong>Partial&lt;<a href="#config">Config</a>&gt;?</strong> Options</li>\n</ul>\n<p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>&lt;<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>&gt;</strong> </p>\n<h4 id="config">Config</h4>\n<p>Type: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></p>\n<h5 id="properties">Properties</h5>\n<ul>\n<li><code>host</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> hostname to use while rendering. Defaults to <a href="http://jsdom.ssr">http://jsdom.ssr</a></li>\n<li><code>eventName</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></strong> event to wait for before rendering app. Defaults to &#39;app-loaded&#39;</li>\n<li><code>beforeEval</code> <strong><a href="#eval">Eval</a></strong> Executed before script is evaluated.</li>\n<li><code>afterEval</code> <strong><a href="#eval">Eval</a></strong> Executed after script is evaluated.</li>\n<li><code>silent</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> Don&#39;t print timestamps</li>\n<li><code>inlineDynamicImports</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> required for apps with dynamic imports</li>\n<li><code>timeout</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></strong> required for apps with dynamic imports</li>\n<li><code>dev</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> disables caching of inlinedDynamicImports bundle</li>\n<li><code>errorHandler</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></strong></li>\n</ul>\n<h4 id="eval">Eval</h4>\n<p>Called before/after the app script is evaluated</p>\n<p>Type: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">Function</a></p>\n<h5 id="parameters-1">Parameters</h5>\n<ul>\n<li><code>dom</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong> The DOM object\n*</li>\n</ul>\n<hr>\n<p><a href="https://www.freepik.com/vectors/party">Party vector created by gstudioimagen - www.freepik.com</a></p>\n';
  }
});

// .svelte-kit/output/server/chunks/p_align_center_n_img-1382--j17q2v-11fc84e0.js
var p_align_center_n_img_1382_j17q2v_11fc84e0_exports = {};
__export(p_align_center_n_img_1382_j17q2v_11fc84e0_exports, {
  default: () => p_align_center_n_img1382_J17q2v
});
var p_align_center_n_img1382_J17q2v;
var init_p_align_center_n_img_1382_j17q2v_11fc84e0 = __esm({
  ".svelte-kit/output/server/chunks/p_align_center_n_img-1382--j17q2v-11fc84e0.js"() {
    p_align_center_n_img1382_J17q2v = '<p align="center">\n    <img alt="stackmix" width="480" src="https://raw.githubusercontent.com/roxiness/stackmix/master/.github/logo.svg">\n</p>\n\n<h1 id="stackmix-preview">Stackmix [preview]</h1>\n<h3 id="template-generator-based-on-svelte-and-routify">Template generator based on Svelte and Routify.</h3>\n<hr>\n<p>Don&#39;t be fooled by the &quot;prerelease&quot;. You should totally take it for a ride. \u{1F60E}</p>\n<h2 id="getting-started">Getting started</h2>\n<pre><code>npx stackmix [app-name]\ncd [app-name]\nnpm install\nnpm run dev\n</code></pre>\n<p>Remember to report any bugs back to us. \u{1F609}</p>\n<hr>\n<h2 id="getting-started-for-contributors-and-testers">Getting started [for contributors and testers]</h2>\n<pre><code class="language-bash">$ git clone https://github.com/roxiness/stackmix.git\n$ cd stackmix\n$ npm install\n</code></pre>\n<h4 id="to-build-a-template-from-fragments">To build a template from fragments</h4>\n<p><code>node lib/cli</code></p>\n<p><strong>The wizard can be skipped by providing fragments as arguments</strong>\n<code>npm run generate -- -fragments rollup,i18n,navigation,content,miligram,mdsvex</code></p>\n<p><strong>use <code>--watch</code> to update output on fragment change</strong></p>\n<hr>\n<p><strong>Given the variety of fragments, we would greatly appreciate contributors for this projects</strong> \u{1F64F}</p>\n';
  }
});

// .svelte-kit/output/server/chunks/div_align_center_n_i-3807--tsvbbz-ef788025.js
var div_align_center_n_i_3807_tsvbbz_ef788025_exports = {};
__export(div_align_center_n_i_3807_tsvbbz_ef788025_exports, {
  default: () => div_align_center_n_i3807_Tsvbbz
});
var div_align_center_n_i3807_Tsvbbz;
var init_div_align_center_n_i_3807_tsvbbz_ef788025 = __esm({
  ".svelte-kit/output/server/chunks/div_align_center_n_i-3807--tsvbbz-ef788025.js"() {
    div_align_center_n_i3807_Tsvbbz = '<div align="center">\n  <img src="https://github.com/roxiness/poindexter/raw/master/./poindexter.svg" width="300px">\n  \n<p>  <strong>Search engine for your static site.</strong></p>\n<p>   Powered by <a href="https://github.com/nextapps-de/flexsearch">FlexSearch</a></p>\n   <br />\n   <br />\n</div>\n\n\n<p>Poindexter scans a folder for HTML files and indexes each file&#39;s content by its relative filename. The full index is output to <code>poindexter.bundle.js</code>, which can be imported and searched with poindexter or flexsearch.</p>\n<h1 id="getting-started">Getting started</h1>\n<h3 id="create-a-searchable-index">Create a searchable index</h3>\n<pre><code>npx poindexter [HTML folder] -o [output path]\n</code></pre>\n<h3 id="searching-with-poindexter">Searching with Poindexter</h3>\n<pre><code class="language-javascript">  import { client } from &quot;poindexter/runtime&quot;;  \n\n  // loads the poindexter.bundle.json.\n  // for custom path: `client.init({ path: &#39;/path/to/poindexter.bundle.js&#39; })`\n  client.init()\n\n  // search the index.\n  client.index.search(query)\n</code></pre>\n<h3 id="narrowing-the-indexable-area">Narrowing the indexable area</h3>\n<p>To avoid indexing navbars and widgets, Poindexter provide the following options.</p>\n<p><strong>contentSelectors</strong> An array of selectors. Poindexter tries each selector untill a match is found. Only the content of the first match is indexed. If no match is found, the page is skipped.</p>\n<p><strong>IgnoreSelectors</strong> An array of selectors. Poindexter removes any elements matching these selectors.</p>\n<p>Please refer to the <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js#L19">scrape function</a> for more info. Alternatively you can use your own scrape function.</p>\n<h3 id="options">Options</h3>\n<p>Please refer to the <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js">defaults</a> for now.</p>\n<h3 id="configuration">Configuration</h3>\n<p>Thanks to <a href="https://github.com/roxiness/configent">Configent</a> Poindexter can be configured here </p>\n<ul>\n<li>poindexter.config.js</li>\n<li>package.json (create a poindexter field)</li>\n<li>environment</li>\n<li>.env</li>\n<li>command line</li>\n<li>API</li>\n</ul>\n<h3 id="title-description-and-keywords">Title, description and keywords</h3>\n<p>Poindexter assumes that title, meta description and meta keywords are available in your HTML. Please refer to <a href="https://github.com/roxiness/poindexter/blob/master/defaults.js#L16">defaults</a> If this is not the case, you can create your own resolvers.</p>\n<p>Custom resolvers</p>\n<pre><code class="language-javascript">{\n  title: $ =&gt; &#39;my website&#39;,\n  description: $ =&gt; $(&#39;.description&#39;) || &#39;no description&#39;,\n  keywords: $ =&gt; $(&#39;meta[name=keywords]&#39;).attr(&#39;content&#39;).split(&#39;,&#39;)\n}\n</code></pre>\n<h1 id="faq">FAQ</h1>\n<h4 id="can-i-use-poindexter-with-a-spa">Can I use Poindexter with a SPA?</h4>\n<p>Poindexter requires a static site. If you have a SPA, have a look at <a href="https://github.com/roxiness/spank">Spank</a>.</p>\n<h4 id="where-can-i-use-poindexter">Where can I use Poindexter?</h4>\n<p>Poindexter can be served from the client, your own backend or a serverless function.</p>\n<h4 id="how-big-are-the-index-bundles">How big are the index bundles?</h4>\n<p>A site like <a href="https://routify.dev">routify.dev</a> with 65 pages, generates a 65 kb bundle after brotli compression.</p>\n<hr>\n<h1 id="example">Example</h1>\n<p><a href="https://routify-2020-git-searchify.sveltaforce.now.sh/">Routify dev build</a>\n<img src="https://github.com/roxiness/poindexter/raw/master/./poindexter.gif"></p>\n';
  }
});

// .svelte-kit/output/server/chunks/img_src_https_github-2871--9idip6-92333768.js
var img_src_https_github_2871_9idip6_92333768_exports = {};
__export(img_src_https_github_2871_9idip6_92333768_exports, {
  default: () => img_src_https_github2871_9idip6
});
var img_src_https_github2871_9idip6;
var init_img_src_https_github_2871_9idip6_92333768 = __esm({
  ".svelte-kit/output/server/chunks/img_src_https_github-2871--9idip6-92333768.js"() {
    img_src_https_github2871_9idip6 = '<img src="https://github.com/jakobrosenberg/consolite/raw/main/./consolite.svg" style="width:100%">\n\n<h2 id="features">Features</h2>\n<ul>\n<li><strong>It&#39;s tiny</strong> - 371 bytes gzip + minify.</li>\n<li><strong>It preserves line numbers</strong> - so you can find exactly where your code was logged.</li>\n<li><strong>Prefixing</strong> - provide context for your logs by adding a prefix.</li>\n<li><strong>Nesting</strong> - sometimes you need to add extra context. This can be handled by creating a child logger</li>\n<li><strong>Log levels</strong> - log levels can be customized and are inherited by child instances</li>\n<li><strong>Native console methods</strong> - consolite wraps around <code>console</code> so any method available on console will be available on consolite.</li>\n</ul>\n<h2 id="install">Install</h2>\n<pre><code>npm install consolite\n</code></pre>\n<h2 id="basic-usage">Basic Usage</h2>\n<pre><code class="language-javascript">import { createLogger } from &#39;consolite&#39;\n\nconst log = createLog()\n\nlog.log(&#39;hello world&#39;) // prints &quot;hello world&quot;\n</code></pre>\n<h2 id="examples">Examples</h2>\n<h3 id="using-prefix">Using prefix</h3>\n<pre><code class="language-javascript">const log = createLog(&#39;[my-prefix]&#39;)\n\nlog.log(&#39;hello world&#39;) // prints &quot;[my-prefix] hello world&quot;\n</code></pre>\n<h3 id="using-a-function-prefix">Using a function prefix</h3>\n<pre><code class="language-javascript">const log = createLog(method =&gt; `${method} -&gt;`)\nlog.debug(&#39;hello world&#39;) // prints &quot;debug -&gt; hello world&quot;\n</code></pre>\n<h3 id="child-logger">Child logger</h3>\n<p>Child loggers inherit prefixes, levels and level from their parents.</p>\n<pre><code class="language-javascript">const log = createLog(&#39;[parent]&#39;)\nconst childLog = log.createChild(&#39;[child]&#39;)\n\nlog.log(&#39;hello world&#39;) // prints &quot;[parent] [child] hello world&quot;\n</code></pre>\n<h3 id="changing-log-level">Changing log level</h3>\n<pre><code class="language-javascript">const log = createLog()\n\nlog.debug(&#39;hello world&#39;) // does nothing\nlog.level = 4 // 3 by default\nlog.debug(&#39;hello world&#39;) // prints &quot;hello world&quot;\n</code></pre>\n<h3 id="changing-default-levels">Changing default levels</h3>\n<pre><code class="language-javascript">const log = createLog()\n\nlog.debug(&#39;hello world&#39;) // does nothing\nlog.levels.debug = 3 // set debug to match current logging level\nlog.debug(&#39;hello world&#39;) // prints &quot;hello world&quot;\n</code></pre>\n<h3 id="adding-custom-method">Adding custom method</h3>\n<pre><code class="language-javascript">const log = createLog()\nlog.register(&#39;silly&#39;, console.log)\nlog.levels.silly = 8\nlog.silly(&#39;hello world&#39;)\n</code></pre>\n';
  }
});

// .svelte-kit/output/server/chunks/_module-1476b092.js
var module_1476b092_exports = {};
__export(module_1476b092_exports, {
  default: () => Module2
});
var css6, Module2;
var init_module_1476b092 = __esm({
  ".svelte-kit/output/server/chunks/_module-1476b092.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
    init_index_e25a1ff5();
    css6 = {
      code: ".page.svelte-afpsxq{position:relative}",
      map: null
    };
    Module2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $meta, $$unsubscribe_meta;
      let $url, $$unsubscribe_url;
      $$unsubscribe_meta = subscribe(meta, (value) => $meta = value);
      $$unsubscribe_url = subscribe(url, (value) => $url = value);
      $$result.css.add(css6);
      $$unsubscribe_meta();
      $$unsubscribe_url();
      return `<div class="${"page svelte-afpsxq"}"><h1>projects</h1>
    <ul class="${"projects"}">${each($meta.repos, (repo) => {
        return `<div><h3><a${add_attribute("href", $url("./[project]", { project: repo.data.name }), 0)}>${escape(repo.data.name)}</a>
                    <p>${escape(repo.data.description || "")}
                    </p></h3>
            </div>`;
      })}</ul>
    ${slots.default ? slots.default({}) : ``}
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/_project_-deef114d.js
var project_deef114d_exports = {};
__export(project_deef114d_exports, {
  default: () => U5Bprojectu5D,
  load: () => load2
});
var css7, load2, U5Bprojectu5D;
var init_project_deef114d = __esm({
  ".svelte-kit/output/server/chunks/_project_-deef114d.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
    init_index_e25a1ff5();
    css7 = {
      code: "article.svelte-1bz96xd{position:absolute;top:0;left:0;bottom:0;right:0;overflow:auto}.close.svelte-1bz96xd{position:absolute;top:56px;right:32px;display:inline-block}",
      map: null
    };
    load2 = async ({ route, node: node2 }) => {
      const { meta: meta2 } = node2.traverse("..");
      const { project } = route.params;
      const repo = meta2.repos.find((repo2) => repo2.data.name === project);
      if (repo)
        return { readme: await repo.readme() };
    };
    U5Bprojectu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $url, $$unsubscribe_url;
      $$unsubscribe_url = subscribe(url, (value) => $url = value);
      let { context: context2 } = $$props;
      if ($$props.context === void 0 && $$bindings.context && context2 !== void 0)
        $$bindings.context(context2);
      $$result.css.add(css7);
      $$unsubscribe_url();
      return `<article class="${"project svelte-1bz96xd"}"><div><!-- HTML_TAG_START -->${context2.load.readme}<!-- HTML_TAG_END --></div></article>
<a class="${"close svelte-1bz96xd"}"${add_attribute("href", $url("../"), 0)}><button>close </button></a>`;
    });
  }
});

// .svelte-kit/output/server/chunks/_module-4e3ecfc3.js
var module_4e3ecfc3_exports = {};
__export(module_4e3ecfc3_exports, {
  default: () => Module3
});
var Module3;
var init_module_4e3ecfc3 = __esm({
  ".svelte-kit/output/server/chunks/_module-4e3ecfc3.js"() {
    init_index_1abd510b();
    Module3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `

${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/index-b6935962.js
var index_b6935962_exports = {};
__export(index_b6935962_exports, {
  default: () => _3_about_me
});
var _3_about_me;
var init_index_b6935962 = __esm({
  ".svelte-kit/output/server/chunks/index-b6935962.js"() {
    init_index_1abd510b();
    _3_about_me = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `about me`;
    });
  }
});

// .svelte-kit/output/server/chunks/index-f35517aa.js
var index_f35517aa_exports = {};
__export(index_f35517aa_exports, {
  default: () => Pages,
  guard: () => guard
});
var guard, Pages;
var init_index_f35517aa = __esm({
  ".svelte-kit/output/server/chunks/index-f35517aa.js"() {
    init_index_1abd510b();
    guard = (route) => {
      route.router.url.replace("/home");
    };
    Pages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/chunks/_...index_-1b88065c.js
function readable(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
      values[i2] = value;
      pending &= ~(1 << i2);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i2;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
function polyfillHistory() {
  const hooks = {
    onPushstate: createSequenceHooksCollection(),
    onReplacestate: createSequenceHooksCollection(),
    onPopstate: createSequenceHooksCollection()
  };
  Object.assign(history, hooks);
  const { pushState, replaceState } = history;
  history["pushStateNative"] = pushState;
  history["replaceStateNative"] = replaceState;
  history.pushState = hooks.onPushstate.run;
  history.replaceState = hooks.onReplacestate.run;
  window.addEventListener("popstate", hooks.onPopstate.run);
  return true;
}
var import_meta, __defProp2, __defNormalProp2, __publicField, __accessCheck3, __privateGet3, __privateAdd3, __privateSet3, _regex, _urlReflector, routes, subscriber_queue2, spreadsLast, getNearestAncestorNodeWithSpreadParam, getUrlFragments, indexOfNode, URIDecodeObject, RouteFragment, URL_STATES, Route, pathAndParamsToUrl, fromEntries, populateUrl, urlFromAddress, contexts, getContextMaybe, getable, identicalRoutes, clone2, BaseReflector, createBrowserAdapter, Global, globalInstance, defaultRe, UrlParamUtils, RNode, CTX, Node, RNodeRuntime, Routify, RoutifyRuntime, createHooksCollection, createPipelineCollection, createSequenceHooksCollection, createGuardsCollection, AddressReflector, InternalReflector, Noop, Object_1, Component, sleep, scrollIsIdle, isParentToARouter, createScrollHandler, plugin, reset, stripNullFields, normalizeRouterOptions, defaultPlugins, _Router, Router, createRouter, Router_1, router, load3, U5B_indexu5D;
var init_index_1b88065c = __esm({
  ".svelte-kit/output/server/chunks/_...index_-1b88065c.js"() {
    init_index_1abd510b();
    import_meta = {};
    __defProp2 = Object.defineProperty;
    __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __publicField = (obj, key2, value) => {
      __defNormalProp2(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
      return value;
    };
    __accessCheck3 = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet3 = (obj, member, getter) => {
      __accessCheck3(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd3 = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet3 = (obj, member, value, setter) => {
      __accessCheck3(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    routes = {
      "meta": {},
      "id": "_default",
      "module": () => Promise.resolve().then(() => (init_module_823b6fcf(), module_823b6fcf_exports)),
      "file": {
        "path": "src/pages/_module.svelte",
        "dir": "src/pages",
        "base": "_module.svelte",
        "ext": ".svelte",
        "name": "_module"
      },
      "rootName": "default",
      "routifyDir": import_meta.url,
      "children": [
        {
          "meta": {
            "order": 1
          },
          "id": "_default_1_home",
          "name": "home",
          "module": false,
          "file": {
            "path": "src/pages/1.home",
            "dir": "src/pages",
            "base": "1.home",
            "ext": ".home",
            "name": "1.home"
          },
          "children": [
            {
              "meta": {},
              "id": "_default_1_home_index_svelte",
              "name": "index",
              "module": () => Promise.resolve().then(() => (init_index_af807f66(), index_af807f66_exports)),
              "file": {
                "path": "src/pages/1.home/index.svelte",
                "dir": "src/pages/1.home",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "children": []
            }
          ]
        },
        {
          "meta": {
            "repos": [
              {
                "data": {
                  "id": 210910840,
                  "node_id": "MDEwOlJlcG9zaXRvcnkyMTA5MTA4NDA=",
                  "name": "routify",
                  "full_name": "roxiness/routify",
                  "private": false,
                  "owner": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/roxiness/routify",
                  "description": "Automated Svelte routes",
                  "fork": false,
                  "url": "https://api.github.com/repos/roxiness/routify",
                  "forks_url": "https://api.github.com/repos/roxiness/routify/forks",
                  "keys_url": "https://api.github.com/repos/roxiness/routify/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/roxiness/routify/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/roxiness/routify/teams",
                  "hooks_url": "https://api.github.com/repos/roxiness/routify/hooks",
                  "issue_events_url": "https://api.github.com/repos/roxiness/routify/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/roxiness/routify/events",
                  "assignees_url": "https://api.github.com/repos/roxiness/routify/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/roxiness/routify/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/roxiness/routify/tags",
                  "blobs_url": "https://api.github.com/repos/roxiness/routify/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/roxiness/routify/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/roxiness/routify/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/roxiness/routify/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/roxiness/routify/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/roxiness/routify/languages",
                  "stargazers_url": "https://api.github.com/repos/roxiness/routify/stargazers",
                  "contributors_url": "https://api.github.com/repos/roxiness/routify/contributors",
                  "subscribers_url": "https://api.github.com/repos/roxiness/routify/subscribers",
                  "subscription_url": "https://api.github.com/repos/roxiness/routify/subscription",
                  "commits_url": "https://api.github.com/repos/roxiness/routify/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/roxiness/routify/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/roxiness/routify/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/roxiness/routify/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/roxiness/routify/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/roxiness/routify/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/roxiness/routify/merges",
                  "archive_url": "https://api.github.com/repos/roxiness/routify/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/roxiness/routify/downloads",
                  "issues_url": "https://api.github.com/repos/roxiness/routify/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/roxiness/routify/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/roxiness/routify/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/roxiness/routify/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/roxiness/routify/labels{/name}",
                  "releases_url": "https://api.github.com/repos/roxiness/routify/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/roxiness/routify/deployments",
                  "created_at": "2019-09-25T18:13:42Z",
                  "updated_at": "2022-01-28T02:56:51Z",
                  "pushed_at": "2022-01-27T18:07:42Z",
                  "git_url": "git://github.com/roxiness/routify.git",
                  "ssh_url": "git@github.com:roxiness/routify.git",
                  "clone_url": "https://github.com/roxiness/routify.git",
                  "svn_url": "https://github.com/roxiness/routify",
                  "homepage": "https://routify.dev",
                  "size": 6050,
                  "stargazers_count": 1439,
                  "watchers_count": 1439,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 62,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 24,
                  "license": {
                    "key": "mit",
                    "name": "MIT License",
                    "spdx_id": "MIT",
                    "url": "https://api.github.com/licenses/mit",
                    "node_id": "MDc6TGljZW5zZTEz"
                  },
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 62,
                  "open_issues": 24,
                  "watchers": 1439,
                  "default_branch": "master",
                  "temp_clone_token": null,
                  "organization": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "network_count": 62,
                  "subscribers_count": 23
                },
                "readme": () => Promise.resolve().then(() => (init_div_align_center_n_i_2054_1ivb1p_4c722558(), div_align_center_n_i_2054_1ivb1p_4c722558_exports)).then((r2) => r2.default)
              },
              {
                "data": {
                  "id": 299939642,
                  "node_id": "MDEwOlJlcG9zaXRvcnkyOTk5Mzk2NDI=",
                  "name": "configent",
                  "full_name": "roxiness/configent",
                  "private": false,
                  "owner": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/roxiness/configent",
                  "description": "no fuzz configurator",
                  "fork": false,
                  "url": "https://api.github.com/repos/roxiness/configent",
                  "forks_url": "https://api.github.com/repos/roxiness/configent/forks",
                  "keys_url": "https://api.github.com/repos/roxiness/configent/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/roxiness/configent/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/roxiness/configent/teams",
                  "hooks_url": "https://api.github.com/repos/roxiness/configent/hooks",
                  "issue_events_url": "https://api.github.com/repos/roxiness/configent/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/roxiness/configent/events",
                  "assignees_url": "https://api.github.com/repos/roxiness/configent/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/roxiness/configent/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/roxiness/configent/tags",
                  "blobs_url": "https://api.github.com/repos/roxiness/configent/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/roxiness/configent/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/roxiness/configent/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/roxiness/configent/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/roxiness/configent/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/roxiness/configent/languages",
                  "stargazers_url": "https://api.github.com/repos/roxiness/configent/stargazers",
                  "contributors_url": "https://api.github.com/repos/roxiness/configent/contributors",
                  "subscribers_url": "https://api.github.com/repos/roxiness/configent/subscribers",
                  "subscription_url": "https://api.github.com/repos/roxiness/configent/subscription",
                  "commits_url": "https://api.github.com/repos/roxiness/configent/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/roxiness/configent/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/roxiness/configent/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/roxiness/configent/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/roxiness/configent/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/roxiness/configent/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/roxiness/configent/merges",
                  "archive_url": "https://api.github.com/repos/roxiness/configent/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/roxiness/configent/downloads",
                  "issues_url": "https://api.github.com/repos/roxiness/configent/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/roxiness/configent/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/roxiness/configent/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/roxiness/configent/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/roxiness/configent/labels{/name}",
                  "releases_url": "https://api.github.com/repos/roxiness/configent/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/roxiness/configent/deployments",
                  "created_at": "2020-09-30T14:06:51Z",
                  "updated_at": "2021-08-06T00:46:02Z",
                  "pushed_at": "2021-12-20T15:46:25Z",
                  "git_url": "git://github.com/roxiness/configent.git",
                  "ssh_url": "git@github.com:roxiness/configent.git",
                  "clone_url": "https://github.com/roxiness/configent.git",
                  "svn_url": "https://github.com/roxiness/configent",
                  "homepage": null,
                  "size": 536,
                  "stargazers_count": 10,
                  "watchers_count": 10,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 1,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 1,
                  "license": null,
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 1,
                  "open_issues": 1,
                  "watchers": 10,
                  "default_branch": "master",
                  "temp_clone_token": null,
                  "organization": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "network_count": 1,
                  "subscribers_count": 2
                },
                "readme": () => Promise.resolve().then(() => (init_div_align_center_n_i_6042_f6acgr_110eaebd(), div_align_center_n_i_6042_f6acgr_110eaebd_exports)).then((r2) => r2.default)
              },
              {
                "data": {
                  "id": 236830441,
                  "node_id": "MDEwOlJlcG9zaXRvcnkyMzY4MzA0NDE=",
                  "name": "tossr",
                  "full_name": "roxiness/tossr",
                  "private": false,
                  "owner": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/roxiness/tossr",
                  "description": "Universal SSR renderer powered by JSDOM",
                  "fork": false,
                  "url": "https://api.github.com/repos/roxiness/tossr",
                  "forks_url": "https://api.github.com/repos/roxiness/tossr/forks",
                  "keys_url": "https://api.github.com/repos/roxiness/tossr/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/roxiness/tossr/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/roxiness/tossr/teams",
                  "hooks_url": "https://api.github.com/repos/roxiness/tossr/hooks",
                  "issue_events_url": "https://api.github.com/repos/roxiness/tossr/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/roxiness/tossr/events",
                  "assignees_url": "https://api.github.com/repos/roxiness/tossr/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/roxiness/tossr/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/roxiness/tossr/tags",
                  "blobs_url": "https://api.github.com/repos/roxiness/tossr/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/roxiness/tossr/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/roxiness/tossr/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/roxiness/tossr/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/roxiness/tossr/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/roxiness/tossr/languages",
                  "stargazers_url": "https://api.github.com/repos/roxiness/tossr/stargazers",
                  "contributors_url": "https://api.github.com/repos/roxiness/tossr/contributors",
                  "subscribers_url": "https://api.github.com/repos/roxiness/tossr/subscribers",
                  "subscription_url": "https://api.github.com/repos/roxiness/tossr/subscription",
                  "commits_url": "https://api.github.com/repos/roxiness/tossr/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/roxiness/tossr/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/roxiness/tossr/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/roxiness/tossr/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/roxiness/tossr/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/roxiness/tossr/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/roxiness/tossr/merges",
                  "archive_url": "https://api.github.com/repos/roxiness/tossr/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/roxiness/tossr/downloads",
                  "issues_url": "https://api.github.com/repos/roxiness/tossr/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/roxiness/tossr/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/roxiness/tossr/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/roxiness/tossr/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/roxiness/tossr/labels{/name}",
                  "releases_url": "https://api.github.com/repos/roxiness/tossr/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/roxiness/tossr/deployments",
                  "created_at": "2020-01-28T20:08:35Z",
                  "updated_at": "2021-12-29T03:02:43Z",
                  "pushed_at": "2021-12-20T15:48:06Z",
                  "git_url": "git://github.com/roxiness/tossr.git",
                  "ssh_url": "git@github.com:roxiness/tossr.git",
                  "clone_url": "https://github.com/roxiness/tossr.git",
                  "svn_url": "https://github.com/roxiness/tossr",
                  "homepage": "",
                  "size": 203,
                  "stargazers_count": 34,
                  "watchers_count": 34,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 6,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 3,
                  "license": null,
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 6,
                  "open_issues": 3,
                  "watchers": 34,
                  "default_branch": "master",
                  "temp_clone_token": null,
                  "organization": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "network_count": 6,
                  "subscribers_count": 4
                },
                "readme": () => Promise.resolve().then(() => (init_div_align_center_n_i_4921_kzwpwn_7bc26563(), div_align_center_n_i_4921_kzwpwn_7bc26563_exports)).then((r2) => r2.default)
              },
              {
                "data": {
                  "id": 324626484,
                  "node_id": "MDEwOlJlcG9zaXRvcnkzMjQ2MjY0ODQ=",
                  "name": "stackmix",
                  "full_name": "roxiness/stackmix",
                  "private": false,
                  "owner": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/roxiness/stackmix",
                  "description": "A collection of templates for Routify.",
                  "fork": false,
                  "url": "https://api.github.com/repos/roxiness/stackmix",
                  "forks_url": "https://api.github.com/repos/roxiness/stackmix/forks",
                  "keys_url": "https://api.github.com/repos/roxiness/stackmix/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/roxiness/stackmix/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/roxiness/stackmix/teams",
                  "hooks_url": "https://api.github.com/repos/roxiness/stackmix/hooks",
                  "issue_events_url": "https://api.github.com/repos/roxiness/stackmix/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/roxiness/stackmix/events",
                  "assignees_url": "https://api.github.com/repos/roxiness/stackmix/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/roxiness/stackmix/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/roxiness/stackmix/tags",
                  "blobs_url": "https://api.github.com/repos/roxiness/stackmix/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/roxiness/stackmix/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/roxiness/stackmix/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/roxiness/stackmix/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/roxiness/stackmix/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/roxiness/stackmix/languages",
                  "stargazers_url": "https://api.github.com/repos/roxiness/stackmix/stargazers",
                  "contributors_url": "https://api.github.com/repos/roxiness/stackmix/contributors",
                  "subscribers_url": "https://api.github.com/repos/roxiness/stackmix/subscribers",
                  "subscription_url": "https://api.github.com/repos/roxiness/stackmix/subscription",
                  "commits_url": "https://api.github.com/repos/roxiness/stackmix/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/roxiness/stackmix/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/roxiness/stackmix/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/roxiness/stackmix/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/roxiness/stackmix/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/roxiness/stackmix/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/roxiness/stackmix/merges",
                  "archive_url": "https://api.github.com/repos/roxiness/stackmix/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/roxiness/stackmix/downloads",
                  "issues_url": "https://api.github.com/repos/roxiness/stackmix/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/roxiness/stackmix/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/roxiness/stackmix/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/roxiness/stackmix/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/roxiness/stackmix/labels{/name}",
                  "releases_url": "https://api.github.com/repos/roxiness/stackmix/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/roxiness/stackmix/deployments",
                  "created_at": "2020-12-26T20:02:30Z",
                  "updated_at": "2022-01-22T17:08:32Z",
                  "pushed_at": "2021-12-26T18:55:25Z",
                  "git_url": "git://github.com/roxiness/stackmix.git",
                  "ssh_url": "git@github.com:roxiness/stackmix.git",
                  "clone_url": "https://github.com/roxiness/stackmix.git",
                  "svn_url": "https://github.com/roxiness/stackmix",
                  "homepage": null,
                  "size": 387,
                  "stargazers_count": 22,
                  "watchers_count": 22,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 3,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 4,
                  "license": null,
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 3,
                  "open_issues": 4,
                  "watchers": 22,
                  "default_branch": "master",
                  "temp_clone_token": null,
                  "organization": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "network_count": 3,
                  "subscribers_count": 7
                },
                "readme": () => Promise.resolve().then(() => (init_p_align_center_n_img_1382_j17q2v_11fc84e0(), p_align_center_n_img_1382_j17q2v_11fc84e0_exports)).then((r2) => r2.default)
              },
              {
                "data": {
                  "id": 314868584,
                  "node_id": "MDEwOlJlcG9zaXRvcnkzMTQ4Njg1ODQ=",
                  "name": "poindexter",
                  "full_name": "roxiness/poindexter",
                  "private": false,
                  "owner": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/roxiness/poindexter",
                  "description": "Search engine for your static site",
                  "fork": false,
                  "url": "https://api.github.com/repos/roxiness/poindexter",
                  "forks_url": "https://api.github.com/repos/roxiness/poindexter/forks",
                  "keys_url": "https://api.github.com/repos/roxiness/poindexter/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/roxiness/poindexter/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/roxiness/poindexter/teams",
                  "hooks_url": "https://api.github.com/repos/roxiness/poindexter/hooks",
                  "issue_events_url": "https://api.github.com/repos/roxiness/poindexter/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/roxiness/poindexter/events",
                  "assignees_url": "https://api.github.com/repos/roxiness/poindexter/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/roxiness/poindexter/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/roxiness/poindexter/tags",
                  "blobs_url": "https://api.github.com/repos/roxiness/poindexter/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/roxiness/poindexter/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/roxiness/poindexter/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/roxiness/poindexter/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/roxiness/poindexter/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/roxiness/poindexter/languages",
                  "stargazers_url": "https://api.github.com/repos/roxiness/poindexter/stargazers",
                  "contributors_url": "https://api.github.com/repos/roxiness/poindexter/contributors",
                  "subscribers_url": "https://api.github.com/repos/roxiness/poindexter/subscribers",
                  "subscription_url": "https://api.github.com/repos/roxiness/poindexter/subscription",
                  "commits_url": "https://api.github.com/repos/roxiness/poindexter/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/roxiness/poindexter/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/roxiness/poindexter/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/roxiness/poindexter/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/roxiness/poindexter/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/roxiness/poindexter/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/roxiness/poindexter/merges",
                  "archive_url": "https://api.github.com/repos/roxiness/poindexter/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/roxiness/poindexter/downloads",
                  "issues_url": "https://api.github.com/repos/roxiness/poindexter/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/roxiness/poindexter/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/roxiness/poindexter/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/roxiness/poindexter/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/roxiness/poindexter/labels{/name}",
                  "releases_url": "https://api.github.com/repos/roxiness/poindexter/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/roxiness/poindexter/deployments",
                  "created_at": "2020-11-21T17:41:49Z",
                  "updated_at": "2022-01-24T18:37:20Z",
                  "pushed_at": "2021-05-19T11:06:34Z",
                  "git_url": "git://github.com/roxiness/poindexter.git",
                  "ssh_url": "git@github.com:roxiness/poindexter.git",
                  "clone_url": "https://github.com/roxiness/poindexter.git",
                  "svn_url": "https://github.com/roxiness/poindexter",
                  "homepage": "",
                  "size": 647,
                  "stargazers_count": 73,
                  "watchers_count": 73,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 2,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 0,
                  "license": null,
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 2,
                  "open_issues": 0,
                  "watchers": 73,
                  "default_branch": "master",
                  "temp_clone_token": null,
                  "organization": {
                    "login": "roxiness",
                    "id": 58428864,
                    "node_id": "MDEyOk9yZ2FuaXphdGlvbjU4NDI4ODY0",
                    "avatar_url": "https://avatars.githubusercontent.com/u/58428864?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/roxiness",
                    "html_url": "https://github.com/roxiness",
                    "followers_url": "https://api.github.com/users/roxiness/followers",
                    "following_url": "https://api.github.com/users/roxiness/following{/other_user}",
                    "gists_url": "https://api.github.com/users/roxiness/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/roxiness/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/roxiness/subscriptions",
                    "organizations_url": "https://api.github.com/users/roxiness/orgs",
                    "repos_url": "https://api.github.com/users/roxiness/repos",
                    "events_url": "https://api.github.com/users/roxiness/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/roxiness/received_events",
                    "type": "Organization",
                    "site_admin": false
                  },
                  "network_count": 2,
                  "subscribers_count": 3
                },
                "readme": () => Promise.resolve().then(() => (init_div_align_center_n_i_3807_tsvbbz_ef788025(), div_align_center_n_i_3807_tsvbbz_ef788025_exports)).then((r2) => r2.default)
              },
              {
                "data": {
                  "id": 407183730,
                  "node_id": "MDEwOlJlcG9zaXRvcnk0MDcxODM3MzA=",
                  "name": "consolite",
                  "full_name": "jakobrosenberg/consolite",
                  "private": false,
                  "owner": {
                    "login": "jakobrosenberg",
                    "id": 4153004,
                    "node_id": "MDQ6VXNlcjQxNTMwMDQ=",
                    "avatar_url": "https://avatars.githubusercontent.com/u/4153004?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/jakobrosenberg",
                    "html_url": "https://github.com/jakobrosenberg",
                    "followers_url": "https://api.github.com/users/jakobrosenberg/followers",
                    "following_url": "https://api.github.com/users/jakobrosenberg/following{/other_user}",
                    "gists_url": "https://api.github.com/users/jakobrosenberg/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/jakobrosenberg/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/jakobrosenberg/subscriptions",
                    "organizations_url": "https://api.github.com/users/jakobrosenberg/orgs",
                    "repos_url": "https://api.github.com/users/jakobrosenberg/repos",
                    "events_url": "https://api.github.com/users/jakobrosenberg/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/jakobrosenberg/received_events",
                    "type": "User",
                    "site_admin": false
                  },
                  "html_url": "https://github.com/jakobrosenberg/consolite",
                  "description": "tiny logger that features line numbers, log levels, log prefixes and nesting",
                  "fork": false,
                  "url": "https://api.github.com/repos/jakobrosenberg/consolite",
                  "forks_url": "https://api.github.com/repos/jakobrosenberg/consolite/forks",
                  "keys_url": "https://api.github.com/repos/jakobrosenberg/consolite/keys{/key_id}",
                  "collaborators_url": "https://api.github.com/repos/jakobrosenberg/consolite/collaborators{/collaborator}",
                  "teams_url": "https://api.github.com/repos/jakobrosenberg/consolite/teams",
                  "hooks_url": "https://api.github.com/repos/jakobrosenberg/consolite/hooks",
                  "issue_events_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues/events{/number}",
                  "events_url": "https://api.github.com/repos/jakobrosenberg/consolite/events",
                  "assignees_url": "https://api.github.com/repos/jakobrosenberg/consolite/assignees{/user}",
                  "branches_url": "https://api.github.com/repos/jakobrosenberg/consolite/branches{/branch}",
                  "tags_url": "https://api.github.com/repos/jakobrosenberg/consolite/tags",
                  "blobs_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/blobs{/sha}",
                  "git_tags_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/tags{/sha}",
                  "git_refs_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/refs{/sha}",
                  "trees_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/trees{/sha}",
                  "statuses_url": "https://api.github.com/repos/jakobrosenberg/consolite/statuses/{sha}",
                  "languages_url": "https://api.github.com/repos/jakobrosenberg/consolite/languages",
                  "stargazers_url": "https://api.github.com/repos/jakobrosenberg/consolite/stargazers",
                  "contributors_url": "https://api.github.com/repos/jakobrosenberg/consolite/contributors",
                  "subscribers_url": "https://api.github.com/repos/jakobrosenberg/consolite/subscribers",
                  "subscription_url": "https://api.github.com/repos/jakobrosenberg/consolite/subscription",
                  "commits_url": "https://api.github.com/repos/jakobrosenberg/consolite/commits{/sha}",
                  "git_commits_url": "https://api.github.com/repos/jakobrosenberg/consolite/git/commits{/sha}",
                  "comments_url": "https://api.github.com/repos/jakobrosenberg/consolite/comments{/number}",
                  "issue_comment_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues/comments{/number}",
                  "contents_url": "https://api.github.com/repos/jakobrosenberg/consolite/contents/{+path}",
                  "compare_url": "https://api.github.com/repos/jakobrosenberg/consolite/compare/{base}...{head}",
                  "merges_url": "https://api.github.com/repos/jakobrosenberg/consolite/merges",
                  "archive_url": "https://api.github.com/repos/jakobrosenberg/consolite/{archive_format}{/ref}",
                  "downloads_url": "https://api.github.com/repos/jakobrosenberg/consolite/downloads",
                  "issues_url": "https://api.github.com/repos/jakobrosenberg/consolite/issues{/number}",
                  "pulls_url": "https://api.github.com/repos/jakobrosenberg/consolite/pulls{/number}",
                  "milestones_url": "https://api.github.com/repos/jakobrosenberg/consolite/milestones{/number}",
                  "notifications_url": "https://api.github.com/repos/jakobrosenberg/consolite/notifications{?since,all,participating}",
                  "labels_url": "https://api.github.com/repos/jakobrosenberg/consolite/labels{/name}",
                  "releases_url": "https://api.github.com/repos/jakobrosenberg/consolite/releases{/id}",
                  "deployments_url": "https://api.github.com/repos/jakobrosenberg/consolite/deployments",
                  "created_at": "2021-09-16T13:52:08Z",
                  "updated_at": "2022-01-07T11:12:48Z",
                  "pushed_at": "2022-01-10T07:51:29Z",
                  "git_url": "git://github.com/jakobrosenberg/consolite.git",
                  "ssh_url": "git@github.com:jakobrosenberg/consolite.git",
                  "clone_url": "https://github.com/jakobrosenberg/consolite.git",
                  "svn_url": "https://github.com/jakobrosenberg/consolite",
                  "homepage": null,
                  "size": 236,
                  "stargazers_count": 2,
                  "watchers_count": 2,
                  "language": "JavaScript",
                  "has_issues": true,
                  "has_projects": true,
                  "has_downloads": true,
                  "has_wiki": true,
                  "has_pages": false,
                  "forks_count": 1,
                  "mirror_url": null,
                  "archived": false,
                  "disabled": false,
                  "open_issues_count": 0,
                  "license": null,
                  "allow_forking": true,
                  "is_template": false,
                  "topics": [],
                  "visibility": "public",
                  "forks": 1,
                  "open_issues": 0,
                  "watchers": 2,
                  "default_branch": "main",
                  "temp_clone_token": null,
                  "network_count": 1,
                  "subscribers_count": 1
                },
                "readme": () => Promise.resolve().then(() => (init_img_src_https_github_2871_9idip6_92333768(), img_src_https_github_2871_9idip6_92333768_exports)).then((r2) => r2.default)
              }
            ],
            "order": 2
          },
          "id": "_default_2_projects",
          "name": "projects",
          "module": () => Promise.resolve().then(() => (init_module_1476b092(), module_1476b092_exports)),
          "file": {
            "path": "src/pages/2.projects/_module.svelte",
            "dir": "src/pages/2.projects",
            "base": "_module.svelte",
            "ext": ".svelte",
            "name": "_module"
          },
          "children": [
            {
              "meta": {
                "dynamic": true
              },
              "id": "_default_2_projects__project__svelte",
              "name": "[project]",
              "module": () => Promise.resolve().then(() => (init_project_deef114d(), project_deef114d_exports)),
              "file": {
                "path": "src/pages/2.projects/[project].svelte",
                "dir": "src/pages/2.projects",
                "base": "[project].svelte",
                "ext": ".svelte",
                "name": "[project]"
              },
              "children": []
            }
          ]
        },
        {
          "meta": {
            "title": "about me",
            "order": 3
          },
          "id": "_default_3_about_me",
          "name": "about-me",
          "module": () => Promise.resolve().then(() => (init_module_4e3ecfc3(), module_4e3ecfc3_exports)),
          "file": {
            "path": "src/pages/3.about-me/_module.svelte",
            "dir": "src/pages/3.about-me",
            "base": "_module.svelte",
            "ext": ".svelte",
            "name": "_module"
          },
          "children": [
            {
              "meta": {},
              "id": "_default_3_about_me_index_svelte",
              "name": "index",
              "module": () => Promise.resolve().then(() => (init_index_b6935962(), index_b6935962_exports)),
              "file": {
                "path": "src/pages/3.about-me/index.svelte",
                "dir": "src/pages/3.about-me",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "children": []
            }
          ]
        },
        {
          "meta": {},
          "id": "_default__loader_svelte",
          "name": "_loader",
          "module": () => Promise.resolve().then(() => (init_loader_fce8554a(), loader_fce8554a_exports)),
          "file": {
            "path": "src/pages/_loader.svelte",
            "dir": "src/pages",
            "base": "_loader.svelte",
            "ext": ".svelte",
            "name": "_loader"
          },
          "children": []
        },
        {
          "meta": {},
          "id": "_default__navigation_svelte",
          "name": "_navigation",
          "module": () => Promise.resolve().then(() => (init_navigation_fb8adec4(), navigation_fb8adec4_exports)),
          "file": {
            "path": "src/pages/_navigation.svelte",
            "dir": "src/pages",
            "base": "_navigation.svelte",
            "ext": ".svelte",
            "name": "_navigation"
          },
          "children": []
        },
        {
          "meta": {},
          "id": "_default_index_svelte",
          "name": "index",
          "module": () => Promise.resolve().then(() => (init_index_f35517aa(), index_f35517aa_exports)),
          "file": {
            "path": "src/pages/index.svelte",
            "dir": "src/pages",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        }
      ]
    };
    subscriber_queue2 = [];
    spreadsLast = (node2) => node2.name.match(/\[\.\.\.(.+)\]/) ? 1 : -1;
    getNearestAncestorNodeWithSpreadParam = (routeFragments) => {
      var _a4;
      for (const fragment of [...routeFragments].reverse()) {
        for (const node2 of ((_a4 = fragment.node.parent) == null ? void 0 : _a4.children) || []) {
          const match = node2.name.match(/\[\.\.\.(.+)\]/);
          if (match)
            return node2;
        }
      }
    };
    getUrlFragments = (url2) => url2.replace(/[?#].+/, "").replace(/\/$/, "").split("/").slice(1);
    indexOfNode = (fragments, node2) => fragments.findIndex((fragment) => fragment.node === node2);
    URIDecodeObject = (obj) => Object.entries(obj).reduce((_return, [key2, value]) => __spreadProps(__spreadValues({}, _return), {
      [key2]: decodeURI(value)
    }), {});
    RouteFragment = class {
      constructor(route, node2, urlFragment) {
        __publicField(this, "_params", {});
        this.route = route;
        this.node = node2;
        this.load = void 0;
        this.urlFragment = urlFragment;
        Object.defineProperty(this, "route", { enumerable: false });
      }
      get params() {
        return this._params;
      }
      setParams(params) {
        this._params = URIDecodeObject(params);
      }
      getParamsFromFragment() {
        const { getFieldsFromName, getValuesFromPath, mapFieldsWithValues } = this.route.router.instance.utils;
        return mapFieldsWithValues(getFieldsFromName(this.node.name), getValuesFromPath(this.node.regex, this.urlFragment));
      }
    };
    URL_STATES = ["pushState", "replaceState", "popState"];
    Route = class {
      constructor(router2, url2, mode) {
        __publicField(this, "allFragments", []);
        __publicField(this, "loaded");
        __publicField(this, "load", {
          status: 200,
          error: null,
          maxage: null,
          props: {},
          redirect: null
        });
        this.router = router2;
        this.url = url2;
        this.mode = mode;
        if (!router2.rootNode) {
          this.router.log.error("Can't navigate without a rootNode");
          const err = new Error("Can't navigate without a rootNode");
          Object.assign(err, { routify: { router: router2 } });
          throw err;
        }
        if (!URL_STATES.includes(mode))
          throw new Error("url.mode must be pushState, replaceState or popState");
        this.allFragments = this._createFragments();
      }
      get fragments() {
        const moduleFragments = this.allFragments.filter((f3) => f3.node.module);
        return this.router.transformFragments.run(moduleFragments);
      }
      get params() {
        const match = this.url.match(/\?.+/);
        const query = match && match[0] || "";
        return Object.assign({}, ...this.allFragments.map((fragment) => fragment.params), this.router.queryHandler.parse(query, this));
      }
      async loadRoute() {
        const { router: router2 } = this;
        const pipeline2 = [
          this.runBeforeUrlChangeHooks,
          this.loadComponents,
          this.runGuards,
          this.runPreloads
        ];
        this.loaded = new Promise(async (resolve2, reject) => {
          for (const pretask of pipeline2) {
            const passedPreTask = await pretask.bind(this)();
            const routerHasNewerPendingRoute = this !== router2.pendingRoute.get();
            if (!router2.pendingRoute.get()) {
              resolve2({ route: router2.activeRoute.get() });
              return;
            } else if (routerHasNewerPendingRoute) {
              router2.pendingRoute.get().loaded.then(resolve2).catch(reject);
              return;
            } else if (!passedPreTask) {
              router2.pendingRoute.set(null);
              return;
            }
          }
          const $activeRoute = this.router.activeRoute.get();
          if ($activeRoute)
            router2.history.push($activeRoute);
          router2.activeRoute.set(this);
          router2.afterUrlChange.run({
            route: this,
            history: [...router2.history].reverse()
          });
          router2.pendingRoute.set(null);
          resolve2({ route: this });
        });
        return this.loaded;
      }
      async loadComponents() {
        await Promise.all(this.fragments.map(async (fragment) => {
          const module2 = await fragment.node.module();
          fragment.node.module = () => module2;
        }));
        return true;
      }
      async runPreloads() {
        var _a4;
        const ctx = {
          route: this,
          node: [...this.fragments].pop().node
        };
        for (const fragment of this.fragments) {
          if ((_a4 = fragment.node.module()) == null ? void 0 : _a4.load) {
            fragment.load = await fragment.node.module().load(ctx);
            Object.assign(this.load, fragment.load);
            if (this.load.redirect)
              return this.router.url.replace(this.load.redirect);
          }
        }
        return this;
      }
      async runGuards() {
        const components = this.fragments.map((fragment) => fragment.node.module()).filter((module2) => module2 == null ? void 0 : module2.guard);
        for (const module2 of components) {
          console.warn('"guard" will be deprecated. Please use "load.redirect" instead.');
          const result = await module2.guard(this);
          if (!result)
            return false;
        }
        return true;
      }
      async runBeforeUrlChangeHooks() {
        return await this.router.beforeUrlChange.run({ route: this });
      }
      _createFragments() {
        const { url: url2 = "", router: router2 } = this;
        const { rootNode } = router2;
        let currentSpreadParam = [];
        let currentNode = rootNode;
        const createFragment = (node2, urlFragment, spreadParam) => {
          const fragment = new RouteFragment(this, node2, urlFragment);
          const spreadMatch = node2.name.match(/\[\.\.\.(.+)\]/);
          if (spreadMatch)
            spreadParam.push(urlFragment);
          else
            spreadParam = [];
          if (spreadMatch)
            fragment.setParams({ [spreadMatch[1]]: spreadParam });
          else
            fragment.setParams(fragment.getParamsFromFragment());
          return fragment;
        };
        const urlFragments = getUrlFragments(url2);
        const routeFragments = [new RouteFragment(this, currentNode, "")];
        for (let ufIndex = 0; ufIndex < urlFragments.length; ufIndex++) {
          const urlFragment = urlFragments[ufIndex];
          const children = currentNode.children.filter((child2) => !child2.name.startsWith("_"));
          const child = children.find((child2) => child2.name === urlFragment) || children.sort(spreadsLast).find((child2) => child2.regex.test(urlFragment));
          if (child) {
            routeFragments.push(createFragment(child, urlFragment, currentSpreadParam));
            currentNode = child;
          } else if (currentSpreadParam.length) {
            currentSpreadParam.push(urlFragment);
          } else {
            const nearestSpreadNode = getNearestAncestorNodeWithSpreadParam(routeFragments);
            if (nearestSpreadNode) {
              const nodeIndex = indexOfNode(routeFragments, nearestSpreadNode);
              const removed = routeFragments.splice(nodeIndex);
              ufIndex = ufIndex - removed.length;
              routeFragments.push(createFragment(nearestSpreadNode, urlFragments[ufIndex], currentSpreadParam));
              currentNode = nearestSpreadNode;
            } else {
              const fallback = currentNode._fallback;
              if (!fallback) {
                throw new Error(`router: "${router2.name || "[default]"}" could not find route: ${url2}`);
              }
              routeFragments.splice(fallback.level);
              routeFragments.push(new RouteFragment(this, fallback, ""));
              break;
            }
          }
        }
        let lastNode = routeFragments[routeFragments.length - 1].node;
        while (lastNode) {
          lastNode = lastNode.children.find((node2) => node2.name === "index");
          if (lastNode)
            routeFragments.push(new RouteFragment(this, lastNode, ""));
        }
        if (!routeFragments.filter(({ node: node2 }) => node2.module).length)
          throw new Error(`could not find route: ${url2}`);
        return routeFragments;
      }
    };
    pathAndParamsToUrl = (path, params = {}, queryHandler) => {
      Object.entries(params).forEach(([key2, val]) => {
        if (path.includes(`[${key2}]`)) {
          path = path.replace(`[${key2}]`, val);
          delete params[key2];
        }
      });
      return path + queryHandler(params);
    };
    fromEntries = (iterable) => {
      return [...iterable].reduce((obj, [key2, val]) => {
        obj[key2] = val;
        return obj;
      }, {});
    };
    populateUrl = (path, params, route) => {
      const overloads = {};
      Object.entries(params).forEach(([param, value]) => {
        const RE = new RegExp(`\\[${param}\\]|\\:${param}`);
        if (path.match(RE))
          path = path.replace(`[${param}]`, encodeURI(value));
        else
          overloads[param] = value;
      });
      const query = route.router.queryHandler.stringify(overloads, route);
      return path + query;
    };
    urlFromAddress = () => (({ pathname, search, hash: hash2 }) => pathname + search + hash2)(window.location);
    contexts = {
      get router() {
        return getContext("routify-fragment-context").route.router;
      },
      get fragment() {
        return getContext("routify-fragment-context");
      }
    };
    getContextMaybe = (name) => {
      try {
        return getContext(name);
      } catch (err) {
      }
    };
    getable = (value, start) => {
      const store = writable2(value, start);
      return Object.assign(store, { get: () => get_store_value(store) });
    };
    identicalRoutes = (...routes2) => routes2.map((route) => JSON.stringify([route == null ? void 0 : route.allFragments, route == null ? void 0 : route.url])).reduce((prev, curr) => prev === curr && curr);
    clone2 = (obj, ...rest) => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj, ...rest);
    BaseReflector = class {
      constructor(router2) {
        this.router = router2;
        this.log = this.router.log;
      }
      install() {
      }
      uninstall() {
      }
      reflect() {
      }
    };
    createBrowserAdapter = (opts) => {
      const delimiter = (opts == null ? void 0 : opts.delimiter) || ";";
      return {
        toRouter: (url2, router2) => {
          const formatRE = router2.name ? `${router2.name}=(.+?)` : `(.+?)`;
          const RE = new RegExp(`(^|${delimiter})${formatRE}(${delimiter}|$)`);
          const matches = url2.match(RE);
          return matches ? matches[2] : "/";
        },
        toBrowser: (routers) => routers.map((r2) => (r2.name ? `${r2.name}=` : "") + r2.url.external()).join(delimiter)
      };
    };
    Global = class {
      constructor() {
        __publicField(this, "instances", []);
        __publicField(this, "browserAdapter", createBrowserAdapter());
        __publicField(this, "urlFromBrowser", (router2) => {
          return this.browserAdapter.toRouter(urlFromAddress(), router2);
        });
        if (typeof window !== "undefined")
          window["__routify"] = this;
      }
      get routers() {
        return [].concat(...this.instances.map((instance) => instance.routers));
      }
      register(instance) {
        this.instances.push(instance);
        return this;
      }
    };
    globalInstance = new Global();
    defaultRe = /\[(.+?)\]/gm;
    UrlParamUtils = class {
      constructor(RE = defaultRe) {
        __publicField(this, "getFieldsFromName", (name) => [...name.matchAll(this.RE)].map((v) => v[1]));
        __publicField(this, "getRegexFromName", (name) => new RegExp("^" + name.replace(this.RE, "(.+)") + "$"));
        __publicField(this, "getValuesFromPath", (re, path) => (path.match(re) || []).slice(1));
        __publicField(this, "mapFieldsWithValues", (fields, values) => this.haveEqualLength(fields, values) && fields.reduce((map, field, index) => {
          map[field] = values[index];
          return map;
        }, {}));
        __publicField(this, "haveEqualLength", (fields, values) => {
          if (fields.length !== values.length)
            throw new Error(`fields and values should be of same length
fields: ${JSON.stringify(fields)}
values: ${JSON.stringify(values)}`);
          return true;
        });
        this.RE = RE;
      }
    };
    RNode = class {
      constructor(name, module2, instance) {
        __publicField(this, "instance");
        __publicField(this, "parent");
        __publicField(this, "meta", {});
        __publicField(this, "id");
        this.instance = instance;
        this.name = name;
        instance.nodeIndex.push(this);
        this.module = module2;
        Object.defineProperty(this, "Instance", { enumerable: false });
        Object.defineProperty(this, "instance", { enumerable: false });
        Object.defineProperty(this, "parent", { enumerable: false });
      }
      appendChild(child) {
        child.parent = this;
      }
      createChild(name, module2) {
        const node2 = this.instance.createNode(name, module2);
        this.appendChild(node2);
        return node2;
      }
      get descendants() {
        return this.instance.nodeIndex.filter((node2) => node2.ancestors.find((n) => n === this));
      }
      remove() {
        const { nodeIndex } = this.instance;
        const index = nodeIndex.findIndex((node2) => node2 === this);
        nodeIndex.splice(index, 1);
      }
      get ancestors() {
        let node2 = this;
        const ancestors = [];
        while (node2 = node2.parent)
          ancestors.push(node2);
        return ancestors;
      }
      get root() {
        let node2 = this;
        while (node2.parent)
          node2 = node2.parent;
        return node2;
      }
      get isRoot() {
        return this === this.root;
      }
      get children() {
        return this.instance.nodeIndex.filter((node2) => node2.parent === this);
      }
      get level() {
        var _a4;
        return (((_a4 = this.parent) == null ? void 0 : _a4.level) || 0) + 1;
      }
      traverse(path) {
        const originNode = path.startsWith("/") ? this.root : this;
        const steps = path.split("/").filter((snip) => snip !== ".").filter(Boolean);
        try {
          const target = steps.reduce((target2, step) => step === ".." ? target2.parent : target2.children.find((node2) => node2.name === step), originNode);
          return target;
        } catch (err) {
          console.error("can't resolve path", path, "from", this.path, "\n", err);
        }
      }
      toJSON() {
        return __spreadProps(__spreadValues({}, this), {
          children: [...this.children]
        });
      }
      get path() {
        return "/" + [this, ...this.ancestors].reverse().map((node2) => node2.name).filter(Boolean).join("/");
      }
    };
    CTX = "routify-fragment-context";
    Node = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { node: node2 } = $$props;
      let { passthrough } = $$props;
      const context2 = __spreadProps(__spreadValues({}, getContext(CTX)), { node: node2 });
      setContext(CTX, context2);
      let Component2;
      if (node2.module)
        node2.getRawComponent().then((r2) => Component2 = r2);
      if ($$props.node === void 0 && $$bindings.node && node2 !== void 0)
        $$bindings.node(node2);
      if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
        $$bindings.passthrough(passthrough);
      return `${node2.module ? `${Component2 ? `${validate_component(Component2, "Component").$$render($$result, Object.assign(passthrough, { context: context2 }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}` : ``}` : `${slots.default ? slots.default({}) : ``}`}`;
    });
    RNodeRuntime = class extends RNode {
      constructor() {
        super(...arguments);
        __privateAdd3(this, _regex, {});
        __publicField(this, "importTree", (snapshotRoot) => {
          const queue = [[this, snapshotRoot]];
          while (queue.length) {
            const [node2, snapshot] = queue.pop();
            const _a4 = snapshot, { children } = _a4, nodeSnapshot = __objRest(_a4, ["children"]);
            Object.assign(node2, nodeSnapshot);
            for (const childSnapshot of children) {
              const childNode = node2.createChild(snapshot.name || snapshot.rootName || "");
              queue.push([childNode, childSnapshot]);
            }
          }
          return this;
        });
      }
      get regex() {
        const { name } = this;
        if (!__privateGet3(this, _regex)[name])
          __privateGet3(this, _regex)[name] = this.instance.utils.getRegexFromName(this.name);
        return __privateGet3(this, _regex)[name];
      }
      set regex(value) {
        __privateGet3(this, _regex)[this.name] = new RegExp(value);
      }
      get children() {
        const nodes = this.instance.nodeIndex;
        return nodes.filter((node2) => node2.parent === this).sort((prev, curr) => (prev.meta.order || 0) - (curr.meta.order || 0));
      }
      get pages() {
        return this.children.filter((node2) => node2.name !== "index").filter((node2) => !node2.meta.fallback).filter((node2) => !node2.name.startsWith("_")).filter((node2) => !node2.name.includes("[")).filter((node2) => {
          var _a4;
          return !(((_a4 = node2.meta) == null ? void 0 : _a4.order) === false);
        });
      }
      getRawComponent() {
        return this.module && new Promise((resolve2) => {
          const modulePromise = this.module();
          const rawComponent = modulePromise.then ? modulePromise.then((r2) => r2.default) : modulePromise.default;
          resolve2(rawComponent);
        });
      }
      get component() {
        const node2 = this;
        return function(options) {
          options.props = __spreadProps(__spreadValues({}, options.props), {
            passthrough: options.props,
            node: node2
          });
          return new Node(__spreadValues({}, options));
        };
      }
      appendChild(child) {
        if (child.instance)
          child.parent = this;
      }
      get _fallback() {
        var _a4;
        return this.children.find((node2) => node2.meta.fallback) || ((_a4 = this.parent) == null ? void 0 : _a4._fallback);
      }
    };
    _regex = new WeakMap();
    Routify = class {
      constructor(options) {
        __publicField(this, "Node", RNode);
        __publicField(this, "mode", "runtime");
        __publicField(this, "nodeIndex", []);
        __publicField(this, "rootNodes", {});
      }
      createNode(name, module2) {
        return new this.Node(name, module2, this);
      }
    };
    RoutifyRuntime = class extends Routify {
      constructor(options) {
        super();
        __publicField(this, "Node", RNodeRuntime);
        __publicField(this, "mode", "runtime");
        __publicField(this, "routers", []);
        __publicField(this, "rootNodes", {});
        this.options = options;
        if (options.routes) {
          this.rootNodes[options.routes.rootName || "unnamed"] = this.createNode(options.routes.rootName).importTree(options.routes);
        }
        this.utils = new UrlParamUtils();
        this.global = globalInstance.register(this);
        Object.defineProperty(this, "routers", { enumerable: false });
        this.log = this.global.log;
      }
    };
    createHooksCollection = (runner) => {
      const hooks = [];
      const hooksCollection = (hook) => {
        hooks.push(hook);
        return () => hooks.splice(hooks.indexOf(hook), 1);
      };
      hooksCollection.hooks = hooks;
      hooksCollection.run = runner(hooks);
      return hooksCollection;
    };
    createPipelineCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => (pipedValue == null ? void 0 : pipedValue.then) ? pipedValue.then((r2) => hook(r2, ...rest)) : hook(pipedValue, ...rest), value));
    createSequenceHooksCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((last, hook) => (last == null ? void 0 : last.then) ? last.then((_) => hook(value, ...rest)) : hook(value, ...rest), value));
    createGuardsCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => (pipedValue == null ? void 0 : pipedValue.then) ? pipedValue.then((r2) => r2 && hook(value, ...rest)) : pipedValue && hook(value, ...rest), value || true));
    AddressReflector = class extends BaseReflector {
      constructor(router2) {
        super(router2);
        __publicField(this, "reflect", () => {
          const { mode } = get_store_value(this.router.activeRoute);
          if (mode === "popState")
            return false;
          const { routers, browserAdapter: browserAdapter2 } = this.router.instance.global;
          const addressRouters = routers.filter((router22) => router22.urlReflector instanceof this.constructor);
          const url2 = browserAdapter2.toBrowser(addressRouters);
          history[`${mode}Native`]({}, "", url2);
        });
        const { instance, urlRewrites } = router2;
        const { urlFromBrowser, browserAdapter } = instance.global;
        if (!history["onPushstate"]) {
          polyfillHistory();
        }
        const createStateEventHandler = (method) => {
          return function(data, title, url2) {
            var _a4;
            const routerName = ((_a4 = data == null ? void 0 : data.routify) == null ? void 0 : _a4.router) ?? false;
            if (routerName === false)
              url2 = browserAdapter.toRouter(url2, router2);
            else if (routerName !== router2.name)
              return false;
            for (const rewrite of urlRewrites)
              url2 = rewrite.toInternal(url2, { router: router2 });
            router2.url[method](url2);
          };
        };
        this.absorb = () => router2.url.replace(urlFromBrowser(router2));
        this._pushstateHandler = createStateEventHandler("push");
        this._replacestateHandler = createStateEventHandler("replace");
        this._popstateHandler = () => router2.url.pop(urlFromBrowser(router2));
      }
      install() {
        this.hooks = [
          history["onPushstate"](this._pushstateHandler),
          history["onReplacestate"](this._replacestateHandler),
          history["onPopstate"](this._popstateHandler)
        ];
        if (!get_store_value(this.router.activeRoute))
          this.absorb();
        else
          this.reflect();
      }
      uninstall() {
        this.hooks.forEach((unreg) => unreg());
        setTimeout(() => this.reflect());
      }
    };
    InternalReflector = class extends BaseReflector {
    };
    Noop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { context: context2 = null } = $$props;
      if ($$props.context === void 0 && $$bindings.context && context2 !== void 0)
        $$bindings.context(context2);
      return `${slots.default ? slots.default({}) : ``}`;
    });
    ({ Object: Object_1 } = globals);
    Component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let fragment;
      let restFragments;
      let node2;
      let load22;
      let route;
      let { fragments } = $$props;
      let { decorator = null } = $$props;
      let { props = {} } = $$props;
      let context2 = {};
      setContext("routify-fragment-context", context2);
      if ($$props.fragments === void 0 && $$bindings.fragments && fragments !== void 0)
        $$bindings.fragments(fragments);
      if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
        $$bindings.decorator(decorator);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0)
        $$bindings.props(props);
      [fragment, ...restFragments] = [...fragments];
      ({ node: node2, load: load22, route } = fragment);
      context2 = Object.assign(context2, { route, node: node2, load: load22, fragment });
      return `${validate_component(decorator || Noop || missing_component, "svelte:component").$$render($$result, { context: context2 }, {}, {
        default: () => {
          return `${validate_component(fragment.node.module().default || missing_component, "svelte:component").$$render($$result, Object_1.assign({ context: context2 }, props, load22 == null ? void 0 : load22.props), {}, {
            default: ({ props: props2, decorator: decorator2 }) => {
              return `${restFragments.length ? `${validate_component(Component, "svelte:self").$$render($$result, {
                fragments: restFragments,
                props: props2,
                decorator: decorator2
              }, {}, {})}` : ``}`;
            }
          })}`;
        }
      })}`;
    });
    sleep = () => new Promise(requestAnimationFrame);
    scrollIsIdle = (timeout = 100) => new Promise((resolve2) => {
      let scrollTimeout;
      const listener = async (e2) => {
        clearTimeout(scrollTimeout);
        await sleep();
        scrollTimeout = setTimeout(() => {
          resolve2();
          removeEventListener("scroll", listener);
        }, timeout);
      };
      addEventListener("scroll", listener);
    });
    isParentToARouter = (elem) => globalInstance.routers.find((router2) => router2.parentElem === elem);
    createScrollHandler = () => {
      const isScrolling = writable2(false);
      const run2 = (_a4) => {
        var _b = _a4, { route, history: history2 } = _b, rest = __objRest(_b, ["route", "history"]);
        var _a5;
        const [path, hash2] = route.url.split("#");
        const [prevPath, _prevHash] = ((_a5 = history2[0]) == null ? void 0 : _a5.url.split("#")) || [];
        const softScroll = async (shouldObserve) => {
          const samePath = path === prevPath;
          const elem = document.getElementById(hash2);
          if (elem)
            elem.scrollIntoView({ behavior: samePath ? "smooth" : "auto" });
          if (samePath && elem) {
            isScrolling.set(true);
            await scrollIsIdle();
            isScrolling.set(false);
          }
          if (!samePath && shouldObserve) {
            const observer = new MutationObserver(() => softScroll());
            observer.observe(document.body, {
              childList: true,
              subtree: true,
              attributes: true,
              characterData: true
            });
            setTimeout(observer.disconnect.bind(observer), 500);
          }
        };
        const resetScroll = (element) => {
          if (element) {
            element.scrollTop = 0;
            const parent = element.parentElement;
            if (parent && parent.scrollTo && (parent == null ? void 0 : parent.dataset["routify-scroll"]) !== "lock" && !isParentToARouter(parent))
              resetScroll(element.parentElement);
          }
        };
        if (hash2)
          softScroll(true);
        else
          resetScroll(route.router.parentElem);
      };
      return { isScrolling, run: run2 };
    };
    plugin = {
      beforeRouterInit: ({ router: router2 }) => {
        const { isScrolling, run: run2 } = createScrollHandler();
        router2.afterUrlChange(run2);
        router2["scrollHandler"] = { isScrolling };
      }
    };
    reset = () => ({
      beforeUrlChange: ({ route }) => {
        const fragments = route.allFragments;
        fragments.forEach((fragment) => {
          const { reset: reset2 } = fragment.node.meta;
          if (reset2) {
            const index = fragments.indexOf(fragment);
            const deleteCount = reset2 === true ? index : Number(reset2);
            const start = index - deleteCount;
            fragments.splice(start, index);
          }
        });
        return true;
      }
    });
    stripNullFields = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
    normalizeRouterOptions = (options, config) => {
      config = config || {
        name: "",
        beforeRouterInit: [],
        afterRouterInit: [],
        urlRewrite: [],
        beforeUrlChange: [],
        afterUrlChange: [],
        transformFragments: [],
        onDestroy: []
      };
      const _a4 = options, { plugins } = _a4, optionsOnly = __objRest(_a4, ["plugins"]);
      const optionsGroups = [...plugins || [], optionsOnly];
      optionsGroups.forEach((pluginOptions) => {
        if ("plugin" in pluginOptions)
          normalizeRouterOptions(pluginOptions, config);
        Object.entries(pluginOptions).forEach(([field, value]) => {
          if (Array.isArray(config[field]))
            config[field].push(...[value].flat().filter(Boolean));
          else
            config[field] = value || config[field];
        });
      });
      return config;
    };
    defaultPlugins = [plugin, reset()];
    _Router = class {
      constructor(input) {
        __publicField(this, "pendingRoute", getable(null));
        __publicField(this, "activeRoute", getable(null));
        __privateAdd3(this, _urlReflector, null);
        __publicField(this, "urlRewrites", []);
        __publicField(this, "beforeRouterInit", createSequenceHooksCollection());
        __publicField(this, "afterRouterInit", createSequenceHooksCollection());
        __publicField(this, "beforeUrlChange", createGuardsCollection());
        __publicField(this, "afterUrlChange", createSequenceHooksCollection());
        __publicField(this, "transformFragments", createPipelineCollection());
        __publicField(this, "onDestroy", createSequenceHooksCollection());
        __publicField(this, "parentElem", null);
        __publicField(this, "queryHandler", {
          parse: (search, route) => fromEntries(new URLSearchParams(search)),
          stringify: (params, route) => {
            const query = new URLSearchParams(params).toString();
            return query ? `?${query}` : "";
          }
        });
        __publicField(this, "url", {
          internal: () => this.url.getPending() || this.url.getActive(),
          external: () => this.getExternalUrl(),
          getActive: () => {
            var _a4;
            return (_a4 = get_store_value(this.activeRoute)) == null ? void 0 : _a4.url;
          },
          getPending: () => {
            var _a4;
            return (_a4 = get_store_value(this.pendingRoute)) == null ? void 0 : _a4.url;
          },
          toString: () => this.url.internal(),
          set: this._setUrl,
          push: (url2) => this._setUrl(url2, "pushState"),
          replace: (url2) => this._setUrl(url2, "replaceState"),
          pop: (url2) => this._setUrl(url2, "popState")
        });
        __publicField(this, "ready", (() => new Promise((resolve2) => {
          let unsub;
          unsub = this.activeRoute.subscribe((route) => {
            if (route)
              resolve2();
            if (unsub)
              unsub();
          });
        }))());
        __publicField(this, "history", []);
        __publicField(this, "setParentElem", (elem) => this.parentElem = elem.parentElement);
        __publicField(this, "getExternalUrl", (url2) => {
          const result = this.urlRewrites.reduce((_url, rewrite) => rewrite.toExternal(_url, { router: this }), url2 || this.url.internal());
          return result;
        });
        __publicField(this, "getInternalUrl", (url2) => this.urlRewrites.reduce((_url, rewrite) => rewrite.toInternal(_url, { router: this }), url2));
        const { subscribe: subscribe2, set } = writable2(this);
        this.subscribe = subscribe2;
        this.triggerStore = () => set(this);
        input.plugins = [...input.plugins || [], ...defaultPlugins].filter(Boolean);
        this.init(input);
        this.params = derived(this.activeRoute, ($activeRoute) => $activeRoute.params);
        this.afterUrlChange(() => setTimeout(() => __privateGet3(this, _urlReflector).reflect()));
        this.activeRoute.get = () => get_store_value(this.activeRoute);
        this.pendingRoute.get = () => get_store_value(this.pendingRoute);
      }
      init(input) {
        const firstInit = !this.options;
        input = stripNullFields(input);
        this.options = normalizeRouterOptions(__spreadValues(__spreadValues({}, this.options), input));
        let {
          instance,
          rootNode,
          name,
          routes: routes2,
          urlRewrite,
          urlReflector,
          url: url2,
          passthrough,
          beforeUrlChange,
          afterUrlChange,
          transformFragments,
          onDestroy: onDestroy2,
          beforeRouterInit,
          afterRouterInit,
          queryHandler
        } = this.options;
        if (queryHandler)
          this.queryHandler = queryHandler;
        beforeUrlChange.forEach(this.beforeUrlChange);
        transformFragments.forEach(this.transformFragments);
        afterUrlChange.forEach(this.afterUrlChange);
        onDestroy2.forEach(this.onDestroy);
        beforeRouterInit.forEach(this.beforeRouterInit);
        afterRouterInit.forEach(this.afterRouterInit);
        this.beforeRouterInit.run({ router: this, firstInit });
        const parentCmpCtx = getContextMaybe("routify-fragment-context");
        this.instance = instance || this.instance || (parentCmpCtx == null ? void 0 : parentCmpCtx.route.router.instance) || globalInstance.instances[0] || new RoutifyRuntime({});
        this.name = name;
        this.urlRewrites = urlRewrite;
        if (passthrough && !(passthrough instanceof _Router))
          passthrough = (parentCmpCtx == null ? void 0 : parentCmpCtx.route.router) || passthrough;
        this.passthrough = passthrough || this.passthrough;
        globalInstance.instances.forEach((inst) => {
          const index = inst.routers.indexOf(this);
          if (index !== -1)
            inst.routers.splice(index, 1);
        });
        this.instance.routers.push(this);
        if (routes2)
          this.importRoutes(routes2);
        this.parentCmpCtx = parentCmpCtx;
        this.rootNode = rootNode || this.rootNode || this.instance.rootNodes.default;
        if (this.url.getActive()) {
          this._setUrl(this.url.getActive(), "pushState", true);
        }
        const shouldInstallUrlReflector = !this.urlReflector || urlReflector && !(this.urlReflector instanceof urlReflector);
        if (shouldInstallUrlReflector) {
          urlReflector = urlReflector || (typeof window != "undefined" ? AddressReflector : InternalReflector);
          this.setUrlReflector(urlReflector);
        }
        if (url2)
          this.url.replace(url2);
        this.triggerStore();
        this.afterRouterInit.run({ router: this, firstInit });
      }
      importRoutes(routes2) {
        this.rootNode = this.instance.createNode().importTree(routes2);
        this.instance.rootNodes[routes2.rootName || "unnamed"] = this.rootNode;
      }
      async _setUrl(url2, mode, isInternal) {
        if (!isInternal)
          url2 = this.getInternalUrl(url2);
        url2 = url2 || "/";
        url2 = url2.replace(/(.+)\/+([#?]|$)/, "$1$2");
        const { activeRoute, pendingRoute: pendingRoute2 } = this;
        activeRoute.get();
        if (!url2.startsWith("/"))
          url2 = url2.replace(new URL(url2).origin, "");
        const route = new Route(this, url2, mode);
        const currentRoute = pendingRoute2.get() || activeRoute.get();
        if (identicalRoutes(currentRoute, route)) {
          return true;
        }
        pendingRoute2.set(route);
        await route.loadRoute();
        return true;
      }
      destroy() {
        this.instance.routers = this.instance.routers.filter((router2) => router2 !== this);
        this.onDestroy.run({ router: this });
      }
      get urlReflector() {
        return __privateGet3(this, _urlReflector);
      }
      setUrlReflector(UrlReflector) {
        var _a4;
        (_a4 = __privateGet3(this, _urlReflector)) == null ? void 0 : _a4.uninstall();
        __privateSet3(this, _urlReflector, new UrlReflector(this));
        __privateGet3(this, _urlReflector).install();
        this.triggerStore();
      }
    };
    Router = _Router;
    _urlReflector = new WeakMap();
    createRouter = (options) => new Router(options);
    Router_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let activeRoute;
      let fragments;
      let $activeRoute, $$unsubscribe_activeRoute = noop2, $$subscribe_activeRoute = () => ($$unsubscribe_activeRoute(), $$unsubscribe_activeRoute = subscribe(activeRoute, ($$value) => $activeRoute = $$value), activeRoute);
      let { router: router2 = null } = $$props;
      let { routes: routes2 = null } = $$props;
      let { decorator = null } = $$props;
      let { urlReflector = null } = $$props;
      let { instance = null } = $$props;
      let { urlRewrite = null } = $$props;
      let { url: url2 = null } = $$props;
      let { name = null } = $$props;
      let { rootNode = null } = $$props;
      let { passthrough = null } = $$props;
      let { beforeRouterInit = null } = $$props;
      let { afterRouterInit = null } = $$props;
      let { beforeUrlChange = null } = $$props;
      let { afterUrlChange = null } = $$props;
      let { transformFragments = null } = $$props;
      let { onDestroy: onDestroy$1 = null } = $$props;
      let { plugins = null } = $$props;
      let { queryHandler = null } = $$props;
      if (typeof window !== "undefined")
        onDestroy(() => router2.destroy());
      if ($$props.router === void 0 && $$bindings.router && router2 !== void 0)
        $$bindings.router(router2);
      if ($$props.routes === void 0 && $$bindings.routes && routes2 !== void 0)
        $$bindings.routes(routes2);
      if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
        $$bindings.decorator(decorator);
      if ($$props.urlReflector === void 0 && $$bindings.urlReflector && urlReflector !== void 0)
        $$bindings.urlReflector(urlReflector);
      if ($$props.instance === void 0 && $$bindings.instance && instance !== void 0)
        $$bindings.instance(instance);
      if ($$props.urlRewrite === void 0 && $$bindings.urlRewrite && urlRewrite !== void 0)
        $$bindings.urlRewrite(urlRewrite);
      if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
        $$bindings.url(url2);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.rootNode === void 0 && $$bindings.rootNode && rootNode !== void 0)
        $$bindings.rootNode(rootNode);
      if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
        $$bindings.passthrough(passthrough);
      if ($$props.beforeRouterInit === void 0 && $$bindings.beforeRouterInit && beforeRouterInit !== void 0)
        $$bindings.beforeRouterInit(beforeRouterInit);
      if ($$props.afterRouterInit === void 0 && $$bindings.afterRouterInit && afterRouterInit !== void 0)
        $$bindings.afterRouterInit(afterRouterInit);
      if ($$props.beforeUrlChange === void 0 && $$bindings.beforeUrlChange && beforeUrlChange !== void 0)
        $$bindings.beforeUrlChange(beforeUrlChange);
      if ($$props.afterUrlChange === void 0 && $$bindings.afterUrlChange && afterUrlChange !== void 0)
        $$bindings.afterUrlChange(afterUrlChange);
      if ($$props.transformFragments === void 0 && $$bindings.transformFragments && transformFragments !== void 0)
        $$bindings.transformFragments(transformFragments);
      if ($$props.onDestroy === void 0 && $$bindings.onDestroy && onDestroy$1 !== void 0)
        $$bindings.onDestroy(onDestroy$1);
      if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
        $$bindings.plugins(plugins);
      if ($$props.queryHandler === void 0 && $$bindings.queryHandler && queryHandler !== void 0)
        $$bindings.queryHandler(queryHandler);
      {
        {
          const options = {
            instance,
            rootNode,
            name,
            routes: routes2,
            urlRewrite,
            urlReflector,
            passthrough,
            beforeRouterInit,
            afterRouterInit,
            beforeUrlChange,
            afterUrlChange,
            transformFragments,
            onDestroy: onDestroy$1,
            plugins,
            queryHandler
          };
          if (!router2)
            router2 = new Router(options);
          else
            router2.init(options);
        }
      }
      {
        if (url2 && url2 !== router2.url.internal())
          router2.url.replace(url2);
      }
      $$subscribe_activeRoute(activeRoute = router2.activeRoute);
      fragments = ($activeRoute == null ? void 0 : $activeRoute.fragments) || [];
      $$unsubscribe_activeRoute();
      return `${$activeRoute ? `<div style="${"display: contents"}">${validate_component(Component, "Component").$$render($$result, { fragments, decorator }, {}, {})}</div>` : ``}

${!router2.parentElem ? `<div></div>` : ``}`;
    });
    router = createRouter({ routes });
    load3 = ({ page }) => router.url.replace(page.path);
    U5B_indexu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Router_1, "Router").$$render($$result, { router }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_...index_.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => U5B_indexu5D,
  load: () => load3
});
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_...index_.svelte.js"() {
    init_index_1abd510b();
    init_index_1b88065c();
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css8,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css8;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/_...index_.svelte-05141c9d.js";
    js3 = ["pages/_...index_.svelte-05141c9d.js", "chunks/vendor-78f63506.js", "chunks/preload-helper-ec9aa979.js"];
    css8 = [];
  }
});

// .svelte-kit/vercel-tmp/entry.js
__export(exports, {
  default: () => entry_default
});

// .svelte-kit/vercel-tmp/shims.js
init_install_fetch();
__fetch_polyfill();

// node_modules/@sveltejs/kit/dist/node.js
var import_stream = __toModule(require("stream"));
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/app.js
init_index_1abd510b();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (typeof value === "string") {
        headers.set(key2, value);
      } else {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, route, match) {
  const mod = await route.load();
  const handler = mod[event.request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  event.params = route.params ? decode_params(route.params(match)) : {};
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    return;
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? response.headers : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(normalized_body, {
    status,
    headers
  });
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && body._writableState && body._events)
      return false;
    if (body[Symbol.toStringTag] === "ReadableStream")
      return false;
  }
  return true;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry4) {
    return entry4[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry4, i2) {
    names.set(entry4[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url2) {
  return new Proxy(url2, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd2(this, _use_hashes, void 0);
    __privateAdd2(this, _dev, void 0);
    __privateAdd2(this, _script_needs_csp, void 0);
    __privateAdd2(this, _style_needs_csp, void 0);
    __privateAdd2(this, _directives, void 0);
    __privateAdd2(this, _script_src, void 0);
    __privateAdd2(this, _style_src, void 0);
    __privateSet2(this, _use_hashes, mode === "hash" || mode === "auto" && prerender);
    __privateSet2(this, _directives, dev ? __spreadValues({}, directives) : directives);
    __privateSet2(this, _dev, dev);
    const d = __privateGet2(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet2(this, _script_src, []);
    __privateSet2(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet2(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet2(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet2(this, _script_needs_csp) && !__privateGet2(this, _use_hashes);
    this.style_needs_nonce = __privateGet2(this, _style_needs_csp) && !__privateGet2(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet2(this, _script_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _script_src).length === 0) {
        __privateGet2(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet2(this, _style_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _style_src).length === 0) {
        __privateGet2(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet2(this, _directives));
    if (__privateGet2(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _style_src)
      ];
    }
    if (__privateGet2(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = new WeakMap();
_dev = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2,
  url: url2,
  params,
  ssr,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = new Map();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (ssr) {
    branch.forEach(({ node: node2, loaded, fetched, uses_credentials }) => {
      if (node2.css)
        node2.css.forEach((url22) => stylesheets.add(url22));
      if (node2.js)
        node2.js.forEach((url22) => modulepreloads.add(url22));
      if (node2.styles)
        Object.entries(node2.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: {
        url: state.prerender ? create_prerendering_url_proxy(url2) : url2,
        params,
        status,
        error: error2,
        stuff
      },
      components: branch.map(({ node: node2 }) => node2.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: ${options.target ? `document.querySelector(${s2(options.target)})` : "document.body"},
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node: node2 }) => `import(${s2(options.prefix + node2.entry)})`).join(",\n						")}
				],
				url: new URL(${s2(url2.href)}),
				params: ${devalue(params)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${inlined_style}
${rendered.css.code}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-svelte");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"'];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      head += `<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url: url22, body: body2, json }) => {
        let attributes2 = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url22)}`;
        if (body2)
          attributes2 += ` data-body="${hash(body2)}"`;
        return `<script ${attributes2}>${json}<\/script>`;
      }).join("\n\n	");
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = url2.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = options.template({ head, body, assets: assets2, nonce: csp.nonce });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  event,
  options,
  state,
  route,
  url: url2,
  params,
  node: node2,
  $session,
  stuff,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node2;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(url2) : url2,
      params,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url2.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            const authorization = event.request.headers.get("authorization");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, opts), options, {
            fetched: requested,
            initiator: route
          });
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 === "set-cookie") {
                  set_cookie_headers = set_cookie_headers.concat(value);
                } else if (key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                fetched.push({
                  url: requested,
                  body: opts.body,
                  json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node2.entry})` : ""}`);
    }
  } else {
    loaded = {};
  }
  if (loaded.fallthrough && !is_error) {
    return;
  }
  return {
    node: node2,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({ event, options, state, $session, status, error: error2, ssr }) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const params = {};
    const layout_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_layout,
      $session,
      stuff: {},
      is_error: false
    });
    const error_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      is_error: true,
      status,
      error: error2
    });
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      url: event.url,
      params,
      ssr
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, ssr } = opts;
  let nodes;
  if (!ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      url: event.url,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      ssr
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return new Response(void 0, {
      status: 204
    });
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node2 = nodes[i2];
        let loaded;
        if (node2) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              url: event.url,
              node: node2,
              stuff,
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, event);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    url: event.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              ssr
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      url: event.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs#hooks-handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, match, options, state, ssr) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  const params = route.params ? decode_params(route.params(match)) : {};
  const $session = await options.hooks.getSession(event);
  const response = await respond$1({
    event,
    options,
    state,
    $session,
    route,
    params,
    ssr
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return new Response(`Bad request in load function: failed to fetch ${state.fetched}`, {
      status: 500
    });
  }
}
async function respond(request, options, state = {}) {
  var _a4;
  const url2 = new URL(request.url);
  if (url2.pathname !== "/" && options.trailing_slash !== "ignore") {
    const has_trailing_slash = url2.pathname.endsWith("/");
    if (has_trailing_slash && options.trailing_slash === "never" || !has_trailing_slash && options.trailing_slash === "always" && !(url2.pathname.split("/").pop() || "").includes(".")) {
      url2.pathname = has_trailing_slash ? url2.pathname.slice(0, -1) : url2.pathname + "/";
      if (url2.search === "?")
        url2.search = "";
      return new Response(void 0, {
        status: 301,
        headers: {
          location: url2.pathname + url2.search
        }
      });
    }
  }
  const { parameter, allowed } = options.method_override;
  const method_override = (_a4 = url2.searchParams.get(parameter)) == null ? void 0 : _a4.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs#configuration-methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  const event = {
    request,
    url: url2,
    params: {},
    locals: {},
    platform: state.platform
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let ssr = true;
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts && "ssr" in opts)
          ssr = opts.ssr;
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: event2.url,
            params: event2.params,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            branch: [],
            ssr: false
          });
        }
        let decoded = decodeURI(event2.url.pathname);
        if (options.paths.base) {
          if (!decoded.startsWith(options.paths.base)) {
            return new Response(void 0, { status: 404 });
          }
          decoded = decoded.slice(options.paths.base.length) || "/";
        }
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response2 = route.type === "endpoint" ? await render_endpoint(event2, route, match) : await render_page(event2, route, match, options, state, ssr);
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            ssr
          });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        ssr
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon" href="/favicon.png" />\n	<meta name="viewport" content="width=device-width, initial-scale=1" />\n	' + head + '\n\n	<!-- Pico.css -->\n	<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.3.3/css/pico.css" />\n</head>\n\n<body>\n	<div id="svelte">' + body + "</div>\n</body>\n\n</html>";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: false,
      target: "#svelte",
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  render(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to app.render must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["favicon.png"]),
  _: {
    mime: { ".png": "image/png" },
    entry: { "file": "start-ece38119.js", "js": ["start-ece38119.js", "chunks/vendor-78f63506.js", "chunks/preload-helper-ec9aa979.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        type: "page",
        pattern: /^(?:\/(.*))?\/?$/,
        params: (m2) => ({ index: m2[1] || "" }),
        path: null,
        a: [0, 2],
        b: [1]
      }
    ]
  }
};

// .svelte-kit/vercel-tmp/entry.js
var app = new App(manifest);
var entry_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await app.render(request));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
