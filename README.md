### Issue with Handling Keyless Entities in Microsoft Dynamics OData V4 API

**Description:**
I am using `odata2ts` to interact with the Microsoft Dynamics API, which is based on OData V4. This API includes certain keyless entities, particularly some that are abstract and others that are open types. However, I'm encountering issues with these specific entities. The entities in question are:

- Abstract Entities: `crmbaseentity` and `crmmodelbaseentity`
- Open Type: `expando`

According to the OData V4 specification, these entities do not require keys. The reasons are as follows:

- **Abstract Entities (`crmbaseentity` and `crmmodelbaseentity`)**: As per OData V4, abstract entities are used as base types for other entities and are not meant to be instantiated directly. Hence, they do not require keys. Reference: [crmbaseentity](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/crmbaseentity?view=dataverse-latest), [crmmodelbaseentity](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/crmmodelbaseentity?view=dataverse-latest), [Abstract entity types (Microsoft)](https://learn.microsoft.com/en-us/odata/webapi/abstract-entity-types), [Edm.Untyped](https://docs.oasis-open.org/odata/new-in-odata/v4.01/cn04/new-in-odata-v4.01-cn04.html#sec_NewBuiltinAbstractTypeEdmUntyped), [Abstrac Entity type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_AbstractEntityType)
- **Open Type (`expando`)**: Open types in OData V4 allow for dynamic properties that are not defined in the model. Given their dynamic and flexible nature, they may not have keys defined. Reference: [expando](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/expando?view=dataverse-latest).

**Issue:**
When trying to work with these entities using `odata2ts`, I am facing:

```bash
Loaded config file:  odata2ts.config.ts
---------------------------
Starting generation process
Found metadata file at:  resource/keyless.xml
Reading metadata from file: resource/keyless.xml
Error while running the program Error: Key property is missing from Entity "AbstractBaseEntity" (AbstractBaseEntity)!
    at C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\@odata2ts\odata2ts\lib\data-model\DataModelDigestion.js:229:23
    at Array.forEach (<anonymous>)
    at DigesterV4.postProcessModel (C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\@odata2ts\odata2ts\lib\data-model\DataModelDigestion.js:218:20)
    at DigesterV4.digestEntityTypesAndOperations (C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\@odata2ts\odata2ts\lib\data-model\DataModelDigestion.js:137:14)
    at DigesterV4.<anonymous> (C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\@odata2ts\odata2ts\lib\data-model\DataModelDigestion.js:106:18)
    at Generator.next (<anonymous>)
    at C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\tslib\tslib.js:169:75
    at new Promise (<anonymous>)
    at Object.__awaiter (C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\tslib\tslib.js:165:16)
    at DigesterV4.digest (C:\Users\erik.kers\repositories\Privat\odata2ts-error-reproduction\node_modules\@odata2ts\odata2ts\lib\data-model\DataModelDigestion.js:105:24)
```

 "Error while running the program Error: Key property is missing from Entity "EmptyBaseEntity" (EmptyBaseEntity)!". This seems to stem from the library's handling (or lack thereof) of keyless entities, particularly in the context of abstract and open types.

**Expected Behavior:**
`odata2ts` should be able to handle keyless entities, including abstract and open types, as per the OData V4 specification. It should allow querying and manipulation of these entities without requiring a defined key.

**Steps to Reproduce:**
1. Create or get a odata schema with entity types that are abstract or open type and has no keys
2. Run `odata2ts` as you would normally do
3. You will get an error because i.e. the abstract entity type did not have a key
   
**Additional Context:**
I created a repo reproducing the issue here: https://github.com/erik-kers/odata2ts-error-reproduction