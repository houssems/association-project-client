function path(root, sublink) {
    return `${root}${sublink}`;
}


const ROOTS_HOMEPAGE = '/homepage';

export const PATH_HOMEPAGE = {
    root: ROOTS_HOMEPAGE,
};

const ROOTS_ASSOCIATION = '/association';


export const PATH_ASSOCIATION = {
    root: ROOTS_ASSOCIATION,
    status: path(ROOTS_ASSOCIATION, '/status'),
    governance: path(ROOTS_ASSOCIATION, '/governance'),
    history: path(ROOTS_ASSOCIATION, '/history'),
    strategicPlan: path(ROOTS_ASSOCIATION, '/strategic-plan'),
    members: path(ROOTS_ASSOCIATION, '/members'),
};


const ROOTS_PROTECTION = '/protection';

export const PATH_PROTECTION = {
    root: ROOTS_PROTECTION,
    discovery: path(ROOTS_PROTECTION, '/discovery'),
    protection: path(ROOTS_PROTECTION, '/protection'),
    tips: path(ROOTS_PROTECTION, '/tips'),
    rareSpecies: path(ROOTS_PROTECTION, '/rare-species'),
};