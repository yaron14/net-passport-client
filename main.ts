import io from "socket.io-client";
import { SOCKET_URL, SIGNATURE_URL } from "./config.json";

interface SignatureRequest {
  from: string;
  to: string;
  data: { description: string; payload: object };
}

const rest_post = async (message) => {
  const resp = await fetch(SIGNATURE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message),
  });
  const data = await resp.json();
  if (data.status === "error")
    throw new Error(`${data.message}. Status code ${data.statusCode}`);
  return data;
};

export const signatureRequest = async (message: SignatureRequest) => {
  const socket = io(SOCKET_URL);
  try {
    const resp: object = await rest_post(message);
    socket.on("message signed", (data: string) => {
      window.dispatchEvent(new CustomEvent("signedmessage", { detail: data }));
    });
    return resp;
  } catch (error) {
    console.error(error.message)
  }
};
