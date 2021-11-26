import {ElementDescriptor} from "./elementDescriptor";

export interface Browser {
    visit(url: string): Promise<void>;

    click(elementDescriptor: ElementDescriptor): Promise<void>;

    clickAndWaitForDisappearanceOf(elementDescriptor: ElementDescriptor): Promise<void>;

    ifPresentClickAndWaitForDisappearanceOf(elementDescriptor: ElementDescriptor): Promise<void>;

    enterTextInto(elementDescriptor: ElementDescriptor, text: string): Promise<void>;
}
