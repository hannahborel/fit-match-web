"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
      <Suspense>
        <SignInContent />
      </Suspense>
    </div>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    // Store the redirect URL in sessionStorage for use after authentication
    if (redirect) {
      sessionStorage.setItem("authRedirect", redirect);
    }
  }, [redirect]);

  return (
    <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <Card
                    className="w-full max-w-[800px] mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl shadow-black/30 rounded-2xl"
                    style={{ minWidth: "350px" }}
                  >
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Sign in to Hustle
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2">
                        Welcome back! Please sign in to continue
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-6 px-6">
                      <div className="grid grid-cols-1 gap-x-4">
                        <Clerk.Connection name="google" asChild>
                          <Button
                            size="lg"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                            className="w-full py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          >
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Icons.google className="mr-2 size-4" />
                                    Google
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                      </div>
                      <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        or
                      </p>
                      <Clerk.Field name="identifier" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Email address</Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter className="px-6 pb-6">
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>

                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Clerk.Link navigate="sign-up">
                            Don&apos;t have an account? Sign up
                          </Clerk.Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="choose-strategy">
                  <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl shadow-black/30 rounded-2xl">
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Use another method
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2">
                        Facing issues? You can use any of these methods to sign
                        in.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <SignIn.SupportedStrategy name="email_code" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Email code
                        </Button>
                      </SignIn.SupportedStrategy>
                      <SignIn.SupportedStrategy name="password" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Password
                        </Button>
                      </SignIn.SupportedStrategy>
                    </CardContent>
                    <CardFooter className="px-6 pb-6">
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action navigate="previous" asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Go back"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="password">
                    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl shadow-black/30 rounded-2xl">
                      <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          Check your email
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          Enter the verification code sent to your email
                        </CardDescription>
                        <p className="text-sm text-gray-600 mt-2">
                          Welcome back <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-y-6 px-6">
                        <Clerk.Field name="password" className="space-y-2">
                          <Clerk.Label asChild>
                            <Label>Password</Label>
                          </Clerk.Label>
                          <Clerk.Input type="password" asChild>
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter className="px-6 pb-6">
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    "Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              type="button"
                              size="sm"
                              variant="link"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>

                  <SignIn.Strategy name="email_code">
                    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl shadow-black/30 rounded-2xl">
                      <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          Check your email
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          Enter the verification code sent to your email
                        </CardDescription>
                        <p className="text-sm text-gray-600 mt-2">
                          Welcome back <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-y-6 px-6">
                        <Clerk.Field name="code">
                          <Clerk.Label className="sr-only">
                            Email verification code
                          </Clerk.Label>
                          <div className="grid gap-y-2 items-center justify-center">
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                autoSubmit
                                className="flex justify-center has-[:disabled]:opacity-50"
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="block text-sm text-destructive text-center" />
                            <SignIn.Action
                              asChild
                              resend
                              className="text-muted-foreground"
                              fallback={({ resendableAfter }) => (
                                <Button variant="link" size="sm" disabled>
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button variant="link" size="sm">
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignIn.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter className="px-6 pb-6">
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    "Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              size="sm"
                              variant="link"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      );
}
