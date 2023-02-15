export const PRODUCT_MOCK_DATA: any = {
    data: [
        {
            "id": 1,
            "title": "Mouse 1",
            "image": "/images/mouse1.webp",
            "price": 170,
            "description": "I've always had a soft spot for Steelseries gaming mice. They're always so balanced: nice lights but not too many; not too expensive; and lovely, understated design. But it wasn't until the Steelseries Prime Wireless mouse that I really, truly, madly, deeply fell in love. The Prime Wireless mouse is a perfect fit for a wide range of hand sizes, and it isn't cluttered with extra buttons.",
            "created_at": "2023-02-08T10:08:06+00:00",
            "updated_at": "2023-02-08T10:08:06+00:00"
        }
    ],
    msg: "",
    status: true
}

export const PRODUCT_MOCK_DATA_ON_ID: any = {
    data:
    {
        "id": 1,
        "title": "Mouse 1",
        "image": "/images/mouse1.webp",
        "price": 170,
        "description": "I've always had a soft spot for Steelseries gaming mice. They're always so balanced: nice lights but not too many; not too expensive; and lovely, understated design. But it wasn't until the Steelseries Prime Wireless mouse that I really, truly, madly, deeply fell in love. The Prime Wireless mouse is a perfect fit for a wide range of hand sizes, and it isn't cluttered with extra buttons.",
        "created_at": "2023-02-08T10:08:06+00:00",
        "updated_at": "2023-02-08T10:08:06+00:00"
    },
    msg: "",
    status: true
}

export const CART_MOCK_DATA: any = {
    data: [
        {
            "id": 279,
            "product": {
                "id": 5,
                "title": "Mouse 5",
                "image": "/images/mouse5.webp",
                "price": 170,
                "description": "I've always had a soft spot for Steelseries gaming mice. They're always so balanced: nice lights but not too many; not too expensive; and lovely, understated design. But it wasn't until the Steelseries Prime Wireless mouse that I really, truly, madly, deeply fell in love. The Prime Wireless mouse is a perfect fit for a wide range of hand sizes, and it isn't cluttered with extra buttons.",
                "created_at": "2023-02-09T04:55:24+00:00",
                "updated_at": "2023-02-09T04:55:24+00:00",
                "total":"510"
            },
            "quantity": 2,
            "created_at": "2023-02-10T14:13:40+00:00",
            "updated_at": "2023-02-10T14:13:57+00:00"
        },
        {
            "id": 280,
            "product": {
                "id": 5,
                "title": "Mouse 5",
                "image": "/images/mouse5.webp",
                "price": 170,
                "description": "I've always had a soft spot for Steelseries gaming mice. They're always so balanced: nice lights but not too many; not too expensive; and lovely, understated design. But it wasn't until the Steelseries Prime Wireless mouse that I really, truly, madly, deeply fell in love. The Prime Wireless mouse is a perfect fit for a wide range of hand sizes, and it isn't cluttered with extra buttons.",
                "created_at": "2023-02-09T04:55:24+00:00",
                "updated_at": "2023-02-09T04:55:24+00:00",
                "total":"510"
            },
            "quantity": 2,
            "created_at": "2023-02-10T14:13:40+00:00",
            "updated_at": "2023-02-10T14:13:57+00:00"
        }
    ],
    msg: "",
    status: true
}

export const DELETE_PRODUCT_DATA = {
    data:[],
    msg:'Deleted a Cart successfully with id 285',
    status:true
}