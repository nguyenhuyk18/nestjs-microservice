enum INVOICE {
    CREATE = 'invoice.create',
    GET_BY_ID = 'invoice.get_by_id',
    UPDATE_BY_ID = 'invoice.update_by_id',
    DELETE_BY_ID = 'invoice.delete_by_id'
}


enum PRODUCT {
    CREATE = 'product.create',
    GET_BY_ID = 'product.get_by_id',
    UPDATE_BY_ID = 'product.update_by_id',
    DELETE_BY_ID = 'product.delete_by_id',
    GET_ALL = 'product.get_all'
}

enum USER {
    CREATE = 'user.create',
    GET_ALL = 'user.get_all',
    GET_BY_USER_ID = 'user.get_by_user_id',
    GET_BY_EMAIL_USER = 'user.get_by_email_user'
}


enum KEYCLOAK {
    CREATE_USER = 'keycloak.create_user'
}

enum AUTHORIZER {
    LOGIN = 'authorizer.login',
    VERIFY_USER_TOKEN = 'authorizer.verify_user_token'
}


export const TCP_REQUEST_MESSAGE = {
    INVOICE, PRODUCT, USER, KEYCLOAK, AUTHORIZER
}