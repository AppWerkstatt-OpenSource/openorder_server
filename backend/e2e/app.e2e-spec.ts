import { OpenOrderPage } from './app.po';

describe('open-order App', () => {
  let page: OpenOrderPage;

  beforeEach(() => {
    page = new OpenOrderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
