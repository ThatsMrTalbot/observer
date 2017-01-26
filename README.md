[![Build Status](https://travis-ci.org/ThatsMrTalbot/observer.svg?branch=master)](https://travis-ci.org/ThatsMrTalbot/observer)

# Typescript Observer
_Simple observer to compliment promise_

## Usage

Like promise you construct an observer using a callback:

```typescript
let observer = new Observer<string>((next, error, done) => {
    next("a");
    next("b");
    next("c");
    done();
})
```

From here you can itterate over the values, a promise is retuened to detect errors/completion:

```typescript
try {
    await observer.itterate((next : string) => {
        console.log(`Next: ${next}`);
    }) 
} catch(e) {
    console.error(`Error: ${e}`);
}

console.log("Done");

```