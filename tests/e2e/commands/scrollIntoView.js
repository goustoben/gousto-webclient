function scrollIntoView(selector, callback) {
  this.getLocationInView(selector, ({ value: { x, y } }) => {
    this.executeAndThrowOnFailure(`window.scrollTo(${x}, ${y})`, [], () => {
      callback && callback();
    });
  });

  return this;
}

exports.command = scrollIntoView;
