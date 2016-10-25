describe('Smoke test home page', function () {
    it('should have a title', function () {
        browser.get('/');
        expect(browser.getTitle()).toEqual('Angular QuickStart');
    });
});
