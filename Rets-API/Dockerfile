# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source
COPY dotnet/*.csproj dotnet/
RUN dotnet restore dotnet/Rets-API.csproj
COPY dotnet/ dotnet/
WORKDIR /source/dotnet
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Rets-API.dll"]
