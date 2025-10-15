import { createClient } from '@supabase/supabase-js';

// These values are expected to be provided by the environment.
// The code is designed to function without these keys by using a mock client.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    'Supabase URL and Key are not provided in environment variables (SUPABASE_URL, SUPABASE_ANON_KEY). Supabase features will be disabled. Using a mock client to prevent the app from crashing.'
  );

  const mockData: { [key: string]: any[] } = {
    contacts: [
      { id: 1, created_at: new Date(Date.now() - 86400000).toISOString(), name: 'Aisha Al-Farsi', email: 'aisha@example.com', message: 'Inquired about the European Grand Tour. Looking for dates in September.', language: 'en' },
      { id: 2, created_at: new Date().toISOString(), name: 'David Chen', email: 'david.chen@example.com', message: 'Hello, I would like to know more about the private aviation options for the Japan trip. Thank you!', language: 'en' },
    ],
    page_views: Array.from({ length: 123 }, (_, i) => ({ id: i + 1, page: '/mock-page' })),
  };

  supabase = {
    from: (table: string) => {
      console.log(`Mock Supabase: Operation on table "${table}".`);
      const tableData = mockData[table] || [];

      const queryBuilder = {
        _isHead: false,
        _count: null,

        insert: async (data: any) => {
          console.log(`Mock Supabase: Successfully simulated inserting data into table "${table}".`, 'Payload:', data);
          return { data: [data], error: null };
        },
        
        select: function(columns = '*', { count = null, head = false } = {}) {
            this._isHead = head;
            this._count = count;
            return this;
        },

        order: function() {
            // No-op for the mock, just allows chaining.
            return this;
        },
        
        then: function(resolve: any, reject: any) {
          try {
            const result = {
                data: this._isHead ? [] : tableData,
                error: null,
                count: this._count ? tableData.length : null,
            };
            resolve(result);
          } catch(e) {
            reject(e);
          }
        },
      };

      return queryBuilder;
    },
  };
}

export { supabase };
