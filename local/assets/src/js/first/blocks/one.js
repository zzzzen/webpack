export let a = "qwer";

export class MyClass {
  log = async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 20000);
    });
    console.log("works");
  }
}
