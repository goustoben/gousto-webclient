function scrollIntoView(selector, callback) {
  this.getLocationInView(selector, ({ value: { x, y } }) => {
    this.windowSize("current", ({ value: { height } }) => {
      const yCentre = height / 2;
      const yScrollToCentre = y - yCentre || yCentre - y;

      this.executeAndThrowOnFailure(
        `window.scrollTo(${x}, ${yScrollToCentre})`,
        [],
        () => {
          callback && callback();
        }
      );
    });
  });

  return this;
}

exports.command = scrollIntoView;
