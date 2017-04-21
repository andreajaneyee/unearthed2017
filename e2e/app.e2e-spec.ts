import { UnearthedWebsitePage } from './app.po';

describe('unearthed-website App', () => {
  let page: UnearthedWebsitePage;

  beforeEach(() => {
    page = new UnearthedWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
