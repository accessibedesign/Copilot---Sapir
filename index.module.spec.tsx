import AccessWidgetUiModule from "./index.module";
import {Button} from "./components/button";

describe("Tests the library `module` entry (as module)", () => {
    it(`sets dictionary and generates \`Button\` component`, async () => {
        const buttonLabel = "Open widget";

        await AccessWidgetUiModule.setDictionary({openWidget: buttonLabel});

        const component = await AccessWidgetUiModule.run({template: Button, data: {}}, document.body);

        const buttonElementLabel = component.ref.querySelector("button").getAttribute("aria-label");

        expect(buttonElementLabel).toBe(buttonLabel);

        await component.detach();
    });

    it(`test \`prepend\` option for \`run\` method`, async () => {
        const stubElement = document.createElement("div");

        document.body.append(stubElement);

        const component = await AccessWidgetUiModule.run({template: Button, data: {}}, document.body, {prepend: true});

        expect((component.ref.getRootNode() as ShadowRoot).host).toBe(document.body.querySelector("body > *:first-child"));

        await component.detach();
    });

    it(`verifies that multiple calles to \`detach\` method does not throw exception`, async () => {
        const component = await AccessWidgetUiModule.run({template: Button, data: {}}, document.body);

        expect(async ()=> {
            await component.detach();
            await component.detach();
        }).not.toThrow();

    });

    //TODO: Test prepend

    it(`create component and updates the dictionary`, async () => {
        const stubButtonLabel = "stub";
        const buttonLabel = "Open widget";

        await AccessWidgetUiModule.setDictionary({openWidget: stubButtonLabel});

        const component = await AccessWidgetUiModule.run({template: Button, data: {}}, document.body);

        const buttonElementLabel = component.ref.querySelector("button").getAttribute("aria-label");

        expect(buttonElementLabel).toBe(stubButtonLabel);

        await AccessWidgetUiModule.setDictionary({openWidget: buttonLabel});

        const buttonElementLabelAfterUpdate = component.ref.querySelector("button").getAttribute("aria-label");

        expect(buttonElementLabelAfterUpdate).toBe(buttonLabel);

        await component.detach();
    });

    it(`create component and updates its props`, async () => {
        const component = await AccessWidgetUiModule.run({template: Button, data: {visible: false}}, document.body);

        const buttonElement = component.ref.querySelector("button");

        expect(buttonElement.classList.contains("trigger-button--visible")).toBe(false);

        await component.update({visible: true});

        expect(component.ref.querySelector("button").classList.contains("hide")).toBe(false);

        await component.detach();
    });

    it(`detects own components correctly using the "isAccessWidgetUiComponent" method`, async () => {
        const component = await AccessWidgetUiModule.run({template: Button, data: {visible: false}}, document.body);
        expect(AccessWidgetUiModule.isOwnComponentRef(component.host)).toBe(true)
        const divElement = document.createElement("div");
        expect(AccessWidgetUiModule.isOwnComponentRef(divElement)).toBe(false)
    })
});
