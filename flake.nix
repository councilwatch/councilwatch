{
  description = "A platform for surveilling the local government before the surveil you";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };

  outputs =
    {
      nixpkgs,
      ...
    }:
    with builtins;
    let
      allSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems =
        f:
        nixpkgs.lib.genAttrs allSystems (
          system:
          f rec {
            inherit system;

            pkgs = import nixpkgs {
              inherit system;
            };

            env = {
              packages = with pkgs; [
                nodejs_24
                biome
                watchexec
                nixfmt-rfc-style
              ];
            };
          }
        );
    in
    {
      devShells = forAllSystems (
        {
          env,
          pkgs,
          ...
        }:
        {
          default = pkgs.mkShell env;
        }
      );
    };
}
