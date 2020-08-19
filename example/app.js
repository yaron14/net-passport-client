import { signatureRequest } from "../main";

const btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  await signatureRequest({
    from: "557048596950712321",
    to: "557048596950712321",
    data: {
      description: "Please pay me 100$",
      payload: { people: ["A", "B", "C", "D"] },
    },
  });
});

window.addEventListener("signedmessage", (e) => {
  console.log("Signature info", e.detail);
});
