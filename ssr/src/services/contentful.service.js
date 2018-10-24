import { createClient } from 'contentful';

const host = 'cdn.contentful.com';
const CONTENT_TYPE_ITEM = 'item';

export class ContentfulService {
    client;
    authorized = false;

    constructor(spaceId, accessToken) {
        this.client = createClient({
            space: spaceId,
            accessToken,
            host
        });
    }

    // Returns a promise with the client
    getClient() {
        if (this.authorized) {
            return Promise.resolve(this.client);
        } else {
            return this.client.getSpace().then(() => {
                this.authorized = true;
                return this.client;
            });
        }
    }

    fetchFeaturedItems() {
        return this.getClient()
            .then(client => {
                return client.getEntries({
                    content_type: CONTENT_TYPE_ITEM,
                    'fields.isFeatured': true,
                    order: 'fields.manufacturer.sys.id'
                });
            })
            .then(response => {
                const { includes, items } = response;
                const { Asset: assets, Entry: entries } = includes;
                return items.map(item => {
                    const { fields, sys } = item;
                    const { id } = sys;
                    const {
                        department,
                        isFeatured,
                        manufacturer,
                        name,
                        photo,
                        price
                    } = fields;

                    const photoId = photo.sys.id;
                    const photoAsset = assets.find(
                        asset => asset.sys.id === photoId
                    );

                    const departmentId = department.sys.id;
                    const departmentEntry = entries.find(
                        entry => entry.sys.id === departmentId
                    );

                    const manufacturerId = manufacturer.sys.id;
                    const manufacturerEntry = entries.find(
                        entry => entry.sys.id === manufacturerId
                    );

                    return {
                        id,
                        name,
                        department: departmentEntry.fields.name,
                        manufacturer: manufacturerEntry.fields.name,
                        price,
                        photo: {
                            url: photoAsset.fields.file.url,
                            title: photoAsset.fields.title
                        },
                        isFeatured
                    };
                });
            });
    }
}
