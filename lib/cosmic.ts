import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for handling Cosmic SDK errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all press releases with related data
export async function getPressReleases() {
  try {
    const response = await cosmic.objects
      .find({ type: 'press-releases' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const releases = response.objects;
    
    // Manual sorting by release_date (newest first)
    return releases.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch press releases');
  }
}

// Get featured press releases
export async function getFeaturedReleases() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'press-releases',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const releases = response.objects;
    
    // Manual sorting by release_date (newest first)
    return releases.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured releases');
  }
}

// Get single press release by slug
export async function getPressRelease(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'press-releases', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch press release');
  }
}

// Get all companies
export async function getCompanies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'companies' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch companies');
  }
}

// Get single company by slug
export async function getCompany(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'companies', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch company');
  }
}

// Get press releases by company
export async function getPressReleasesByCompany(companyId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'press-releases',
        'metadata.company': companyId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const releases = response.objects;
    
    // Manual sorting by release_date (newest first)
    return releases.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch company releases');
  }
}

// Get all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get single category by slug
export async function getCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Get press releases by category
export async function getPressReleasesByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'press-releases',
        'metadata.categories': categoryId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const releases = response.objects;
    
    // Manual sorting by release_date (newest first)
    return releases.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch category releases');
  }
}