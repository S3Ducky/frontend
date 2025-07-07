"use client"

export function Footer(){
    return (
        <footer className="border-t bg-muted/50 py-6 mt-12">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p className="mb-2">
                  © 2025 S3Ducky. All rights reserved. |
                  <a href="#" className="ml-1 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  |
                  <a href="#" className="ml-1 hover:underline">
                    Terms of Service
                  </a>
                </p>
                <p className="text-xs">
                  ⚠️ Legal Disclaimer: AWS credentials are processed securely in memory only. No credentials are stored
                  or transmitted to third parties.
                </p>
              </div>
            </footer>

    );
}