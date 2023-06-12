export class CommonHelper {
  static scrollToTop(top = 0, behavior = 'smooth') {
    window.scrollTo({ top, behavior });
  }
}
