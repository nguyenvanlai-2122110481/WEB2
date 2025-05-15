import React from 'react';
import {
    ArrayInput, BooleanInput, Create, ImageField, ImageInput, NumberInput, ReferenceInput, required,
    SimpleForm, SimpleFormIterator, SelectInput, TextInput, minValue, maxValue
} from 'react-admin';
import CategoryTypeInput from './Category/CategoryTypeInput';
import { colorSelector } from '../../components/Filters/ColorsFilter';

export const sizeSelector = [
    { id: 'S', name: 'S' },
    { id: 'M', name: 'M' },
    { id: 'L', name: 'L' },
    { id: 'XL', name: 'XL' },
    { id: 'XXL', name: 'XXL' },
];

const colorChoices = Object.keys(colorSelector).map(key => ({ id: key, name: key }));

const CreateProduct = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" validate={[required()]} label="Product Name" />
                <TextInput source="slug" validate={[required()]} label="Slug" />
                <TextInput source="description" validate={[required()]} multiline label="Description" />
                <NumberInput source="price" validate={[required(), minValue(0)]} label="Price" />
                <TextInput source="brand" validate={[required()]} label="Brand" />
                <ReferenceInput source="categoryId" reference="category" validate={[required()]} label="Category">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <CategoryTypeInput />
                <ImageInput source="thumbnail" label="Thumbnail" accept="image/*" validate={[required()]}>
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ArrayInput source="variants" label="Variants">
                    <SimpleFormIterator inline>
                        <SelectInput
                            source="color"
                            choices={colorChoices}
                            validate={[required()]}
                            label="Color"
                        />
                        <SelectInput
                            source="size"
                            choices={sizeSelector}
                            optionValue="id"
                            optionText="name"
                            validate={[required()]}
                            label="Size"
                        />
                        <NumberInput
                            source="stockQuantity"
                            validate={[required(), minValue(0)]}
                            label="Stock Quantity"
                        />
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="productResources" label="Product Resources">
                    <SimpleFormIterator inline>
                        <TextInput source="name" validate={[required()]} label="Resource Name" />
                        <ImageInput source="url" label="Image" accept="image/*" validate={[required()]}>
                            <ImageField source="src" title="title" />
                        </ImageInput>
                        <SelectInput
                            source="type"
                            choices={[{ id: 'image', name: 'Image' }]}
                            validate={[required()]}
                            label="Type"
                        />
                        <BooleanInput source="isPrimary" label="Is Primary" />
                    </SimpleFormIterator>
                </ArrayInput>
                <NumberInput
                    source="rating"
                    validate={[minValue(0), maxValue(5)]}
                    label="Rating"
                    defaultValue={0}
                />
                <BooleanInput source="newArrival" label="New Arrival" defaultValue={false} />
            </SimpleForm>
        </Create>
    );
};

export default CreateProduct;