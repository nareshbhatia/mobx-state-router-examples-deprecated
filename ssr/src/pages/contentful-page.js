import React from 'react';
import { inject, observer } from 'mobx-react';
import { CurrencyUtils } from '../utils/currency-utils';
import './contentful-page.css';

export const ContentfulPage = inject('rootStore')(
    observer(({ rootStore }) => (
        <div className="content">
            <h1 className="title">Featured Items</h1>
            <ul className="item-list">
                {rootStore.itemStore.items.map(item => (
                    <li key={item.id}>
                        <Item item={item} />
                    </li>
                ))}
            </ul>
        </div>
    ))
);

const Item = ({ item }) => (
    <div className="item">
        <div className="item__lhs">
            <img
                className="item__photo"
                src={`https:${item.photo.url}?w=120`}
                alt={item.photo.title}
            />
        </div>

        <div className="item__rhs">
            <div className="item__name">{item.name}</div>
            <div>by {item.manufacturer}</div>
            <div className="item__price">
                {CurrencyUtils.toString(item.price, 'USD')}
            </div>
        </div>
    </div>
);
